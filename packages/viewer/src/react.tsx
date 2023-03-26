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
  Context, ContextMutatorIdentifier, Middleware,
Mutate,  Plugin,
  Store,
  ViewerProps
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
  Value = unknown,
  Cms extends [ContextMutatorIdentifier, unknown][] = []
> {
  store: Store
  context: Mutate<Context, Cms>
}

interface CreateViewerHookConfig<Value = unknown> {
  plugins?: Plugin[]
  store?: Store
}

declare module './vanilla' {
  interface ContextMutators<C, A> {
    ['rich-data/react']: {
      useViewer: () => FC<ViewerProps>
    }
  }
}

export function createViewerHook<
  Cms extends [ContextMutatorIdentifier, unknown][] = []
> (config: CreateViewerHookConfig) {
  const store = config.store ?? getDefaultStore()
  let context = createContext(store)
  if (config.plugins) {
    const plugins = [...config.plugins].reverse()
    const blocks = plugins.map(
      (plugin) => {
        if ('block' in plugin) {
          return plugin.block
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

  return function useViewer<
    Value = unknown
  > (config?: Omit<ViewerHookConfig<Value>, 'context' | 'store'>) {
    return useBlankViewer<Value, Cms>({
      context: context as Mutate<Context, Cms>,
      store,
      ...config
    })
  }
}

export function useBlankViewer<
  Value = unknown,
  Cms extends [ContextMutatorIdentifier, unknown][] = []
> (config: ViewerHookConfig<Value, Cms>) {
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
    context: config.context as Mutate<Context, Cms>
  }), [Provider, Viewer, config.context])
}
