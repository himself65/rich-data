import {
  createStore as createJotaiStore,
  Provider,
  useAtom,
  useAtomValue, useSetAtom
} from 'jotai'
import type {
  ComponentType,
  PropsWithChildren,
  ReactElement
} from 'react'
import {
  Suspense,
  useDebugValue,
  useEffect, useId,
  useMemo
} from 'react'

import {
  internalBlocksAtom,
  internalContextAtom,
  internalElementAtom,
  internalMiddlewareAtom,
  internalMiddlewarePromiseAtom,
  internalRootValueAtom,
  internalViewerAtom
} from './atom.js'
import type {
  Block,
  Context,
  ContextMutatorIdentifier, ContextMutators,
  DataValueProps, Middleware,
  Plugin,
  Store,
  ViewerProps, Write
} from './vanilla.js'
import { createContext } from './vanilla.js'

function ViewerProvider (props: PropsWithChildren<{
  store: Store
}>): ReactElement {
  return (
    <Provider key="jotai-provider" store={props.store}>
      {props.children}
    </Provider>
  )
}

function useTypeRenderer<Value = unknown> (value: Value): Block | undefined {
  const typeRenderers = useAtomValue(internalBlocksAtom)
  return useMemo(
    () => typeRenderers.find(
      typeRenderer => typeRenderer.is(value)),
    [typeRenderers, value]
  )
}

function ViewerImpl<Value = unknown> (props: ViewerProps<Value>): ReactElement {
  const typeRenderer = useTypeRenderer(props.value)
  if (!typeRenderer) {
    throw new Error('no type renderer found: ' + props.value)
  }
  const context = useAtomValue(internalContextAtom)
  useDebugValue(typeRenderer.flavour, type => `type: ${type}`)
  const Component = typeRenderer.Component as ComponentType<DataValueProps<Value>>
  return (
    <Suspense fallback="loading...">
      <Component value={props.value} context={context}/>
    </Suspense>
  )
}

ViewerImpl.displayName = 'Viewer'

export type InterPluginContext<
  C,
  Plugins extends readonly Plugin[]
> =
  Plugins extends readonly [infer Current, ...infer Rest]
    ? Current extends Middleware<infer Id>
      ? Rest extends Plugin[]
        ? InterPluginContext<Write<C, ContextMutators<C, unknown>[Id]>, Rest>
        : Write<C, ContextMutators<C, unknown>[Id]>
      : Current extends Promise<infer AsyncCurrent>
        ? AsyncCurrent extends { id: infer Id }
          ? Id extends ContextMutatorIdentifier
            ? Rest extends Plugin[]
              ? InterPluginContext<Write<C, ContextMutators<C, unknown>[Id]>, Rest>
              : Write<C, ContextMutators<C, unknown>[Id]>
            : C
          : Rest extends Plugin[]
            ? InterPluginContext<C, Rest>
            : C
        : Rest extends Plugin[]
          ? InterPluginContext<C, Rest>
          : C
    : C

interface ViewerHookConfig<
  Value,
  Plugins extends readonly Plugin[]
> {
  getStore: () => Store,
  Loading: ComponentType | undefined
}

const map = new Map<string, Store>()

export function createViewerHook<
  Plugins extends readonly Plugin[]
> (config: {
  plugins: Plugins
  loading?: ComponentType
}) {
  const plugins = new Array<Plugin>(...config.plugins) as unknown as Plugins
  const storeRef = {
    current: null as Store | null
  }
  const getStore = () => {
    if (!storeRef.current) {
      throw new Error('Store is not set')
    }
    return storeRef.current
  }

  function createStoreImpl () {
    const store = createJotaiStore()
    storeRef.current = store
    let context = createContext(store) as InterPluginContext<Context, Plugins>
    const blocks = plugins.map(
      (plugin) => {
        if ('flavour' in plugin) {
          return plugin satisfies Block
        }
        return null
      }
    ).filter(Boolean) as Block[]
    store.set(internalBlocksAtom, blocks)

    const middleware = plugins.map(
      (plugin) => {
        if ('id' in plugin) {
          return plugin
        }
        return null
      }
    ).filter(Boolean) as Middleware[]

    const middlewarePromises = plugins.map(
      (plugin) => plugin instanceof Promise ? plugin : null).
      filter(Boolean) as Promise<Middleware>[]
    context = middleware.reduce(
      (context, { middleware }) => ({ ...context, ...middleware(store) }),
      context)

    Promise.all(middlewarePromises).then(
      (middlewares) => store.set(internalContextAtom, (context) =>
        middlewares.reduce(
          (context, { middleware }) => ({ ...context, ...middleware(store) }),
          context)
      )
    )

    store.set(internalMiddlewareAtom, [...middleware, ...middlewarePromises])
    store.set(internalContextAtom, context)
    return store
  }

  const Loading = config.loading
  return {
    useViewer: function useViewer<
      Value
    > (config: Omit<ViewerHookConfig<Value, Plugins>, 'getStore' | 'Loading'> = {}) {
      return useBlankViewer<Value, Plugins>({
        ...config,
        getStore,
        Loading
      })
    },
    Provider: function Provider (props: PropsWithChildren<{
      store?: Store
    }>): ReactElement {
      const id = useId()
      if (!props.store) {
        if (!map.has(id)) {
          const store = props.store ?? createStoreImpl()
          store.set(internalViewerAtom, () => ViewerImpl)
          map.set(id, store)
        }
      } else if (!map.has(id)) {
        map.set(id, props.store)
        props.store.set(internalViewerAtom, () => ViewerImpl)
      }
      return (
        <ViewerProvider store={map.get(id) as Store}>
          {props.children}
        </ViewerProvider>
      )
    },
    useContext: function useContext (): InterPluginContext<Context, Plugins> {
      const context = useAtomValue(internalContextAtom)
      if (!context) {
        throw new Error('Context is not set')
      }
      return context as InterPluginContext<Context, Plugins>
    },
    createStore: createStoreImpl,
    getStore
  } as const
}

export function useBlankViewer<
  Value,
  Plugins extends readonly Plugin[],
> ({ getStore, Loading }: ViewerHookConfig<Value, Plugins>) {
  const ViewerInner = useMemo(() =>
    function ViewerInner (props: ViewerProps<Value>): ReactElement {
      const [root, setRoot] = useAtom(internalRootValueAtom)
      const middlewares = useAtomValue(internalMiddlewarePromiseAtom)
      useEffect(() => {
        const store = getStore()
        const effects = middlewares.map(
          (plugin) => {
            if ('id' in plugin) {
              return plugin.effect
            }
            return null
          }
        ).filter(Boolean) as Middleware['effect'][]

        const disposes = effects.map(effect => effect(store))
        return () => {
          disposes.map(dispose => dispose())
        }
      }, [middlewares])
      if (root !== props.value) {
        setRoot(props.value)
      }
      return (
        <div
          data-is-root="true"
          className="rich-data--viewer"
        >
          <ViewerImpl {...props}/>
        </div>
      )
    }, [getStore])
  const Viewer = useMemo(() =>
      function Viewer (props: ViewerProps<Value>): ReactElement {
        const setElement = useSetAtom(internalElementAtom)
        return (
          <div
            ref={setElement}
          >
            <Suspense fallback={Loading ? <Loading/> : undefined}>
              <ViewerInner {...props}/>
            </Suspense>
          </div>
        )
      }
    , [ViewerInner, Loading]
  )
  if (!Object.prototype.hasOwnProperty.call(Viewer, 'displayName')) {
    Object.assign(Viewer, {
      displayName: 'RichDataViewer'
    })
  }

  return useMemo(() => ({
    Viewer
  } as const), [Viewer])
}
