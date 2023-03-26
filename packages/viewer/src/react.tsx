import { getDefaultStore, Provider, useAtomValue } from 'jotai'
import type {
  ComponentType, FC,
  PropsWithChildren,
  ReactElement
} from 'react'
import {
  useDebugValue,
  useMemo
} from 'react'

import { contextAtom, typeRenderersAtom, viewerAtom } from './atom'
import type {
  Block,
  Context,
  ContextMutators,
  Middleware,
  Plugin,
  Store,
  ViewerProps, Write
} from './vanilla'
import { createContext } from './vanilla'

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
  const typeRenderers = useAtomValue(typeRenderersAtom)
  return useMemo(
    () => typeRenderers.find(
      typeRenderer => typeRenderer.is(value)),
    [typeRenderers, value]
  )
}

function ViewerImpl<Value = unknown> (props: ViewerProps<Value>): ReactElement {
  const typeRenderer = useTypeRenderer(props.value)
  if (!typeRenderer) {
    throw new Error('no type renderer found')
  }
  useDebugValue(typeRenderer.flavour, type => `type: ${type}`)
  const Component = typeRenderer.Component as ComponentType<ViewerProps<Value>>
  return (
    <Component value={props.value}/>
  )
}

ViewerImpl.displayName = 'Viewer'

interface ViewerHookConfig<
  Value,
  Plugins extends readonly Plugin[]
> {
  store: Store
  context: InterPluginContext<Context, Plugins>
}

export type InterPluginContext<
  C,
  Plugins extends readonly Plugin[]
> =
  Plugins extends readonly [infer Current, ...infer Rest]
    ? Current extends Middleware<infer Id>
      ? Rest extends Plugin[]
        ? InterPluginContext<Write<C, ContextMutators<C, unknown>[Id]>, Rest>
        : Write<C, ContextMutators<C, unknown>[Id]>
      : Rest extends Plugin[]
        ? InterPluginContext<C, Rest>
        : never
    : Plugins extends [] ? C : C

declare module './vanilla' {
  interface ContextMutators<C, A> {
    ['rich-data/react']: {
      useViewer: () => FC<ViewerProps>
    }
  }
}

export function createViewerHook<
  Plugins extends readonly Plugin[]
> (config: {
  plugins: Plugins
  store?: Store
}) {
  const store = config.store ?? getDefaultStore()
  let context = createContext(store) as InterPluginContext<Context, Plugins>
  if (config.plugins) {
    const plugins = [...config.plugins].reverse()
    const blocks = plugins.map(
      (plugin) => {
        if ('flavour' in plugin) {
          return plugin satisfies Block
        }
        return null
      }
    ).filter(Boolean) as Block[]
    store.set(typeRenderersAtom, blocks)

    const middleware = plugins.map(
      (plugin) => {
        if ('id' in plugin) {
          return plugin.middleware
        }
        return null
      }
    ).filter(Boolean) as Middleware['middleware'][]
    context = middleware.reduce(
      (context, middleware) => ({ ...context, ...middleware(store) }), context)
  }

  store.set(contextAtom, context)

  return {
    useViewer: function useViewer<
      Value
    > (config?: Omit<ViewerHookConfig<Value, Plugins>, 'context' | 'store'>) {
      return useBlankViewer<Value, Plugins>({
        context,
        store,
        ...config
      } as const)
    },
    useContext: function useContext(): InterPluginContext<Context, Plugins> {
      const context = useAtomValue(contextAtom)
      if (!context) {
        throw new Error('Context is not set')
      }
      return context
    }
  }
}

export function useBlankViewer<
  Value,
  Plugins extends readonly Plugin[],
> (config: ViewerHookConfig<Value, Plugins>) {
  const store = config.store
  const Provider = useMemo(() => function Provider (props: PropsWithChildren) {
    return (
      <ViewerProvider store={store}>
        {props.children}
      </ViewerProvider>
    )
  }, [store])

  const Viewer = useMemo(() =>
      function Viewer (props: ViewerProps<Value>): ReactElement {
        return (
          <div data-is-root="true">
            <ViewerImpl {...props}/>
          </div>
        )
      }
    , []
  )

  if (!Object.prototype.hasOwnProperty.call(Viewer, 'displayName')) {
    Object.assign(Viewer, {
      displayName: 'RichDataViewer'
    })
  }

  if (store.get(viewerAtom) !== Viewer) {
    store.set(viewerAtom, () => ViewerImpl as FC<ViewerProps>)
  }

  return useMemo(() => ({
    Viewer,
    Provider,
    getContext: () => (config.context as InterPluginContext<Context, Plugins>)
  } as const), [Provider, Viewer, config.context])
}
