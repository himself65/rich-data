import { createStore, Provider, useAtomValue } from 'jotai'
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
  Context, Plugin, Store,
  TypeRenderer,
  ViewerProps
} from './vanilla'

function ViewerProvider (props: PropsWithChildren<{
  store: Store
}>): ReactElement {
  return (
    <Provider key='jotai-provider' store={props.store}>
      {props.children}
    </Provider>
  )
}

function useTypeRenderer<Value = unknown> (value: Value): TypeRenderer | undefined {
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

interface ViewerHookConfig<Value = unknown> {
  store: Store
  context: Context
}

interface CreateViewerHookConfig<Value = unknown> {
  // fixme: remove any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: Plugin<any>[]
}

declare module './vanilla' {
  interface Context {
    getViewer: () => FC<ViewerProps>
  }
}

export function createContext (store: Store): Context {
  return {
    getViewer: () => {
      const Viewer = store.get(viewerAtom)
      if (!Viewer) {
        throw new Error('no viewer found')
      }
      return Viewer
    }
  }
}

export function createViewerHook (config: CreateViewerHookConfig) {
  const store = createStore()
  const context = createContext(store)
  if (config.plugins) {
    const plugins = [...config.plugins].reverse()
    store.set(typeRenderersAtom, plugins.map(plugin => plugin.typeRenderer))
  }
  store.set(contextAtom, context)

  return function useViewer<Value = unknown> (config?: Omit<ViewerHookConfig<Value>, 'context' | 'store'>) {
    return useBlankViewer({
      context,
      store,
      ...config
    })
  }
}

export function useBlankViewer<Value = unknown> (config: ViewerHookConfig<Value>) {
  const store = config.store
  const Viewer = useMemo(() =>
      function Viewer (props: ViewerProps<Value>): ReactElement {
        return (
          <ViewerProvider store={store}>
            <div data-is-root="true">
              <ViewerImpl {...props}/>
            </div>
          </ViewerProvider>
        )
      }
    , [store]
  )

  if (!Object.prototype.hasOwnProperty.call(Viewer, 'displayName')) {
    Object.assign(Viewer, {
      displayName: 'RichDataViewer',
    })
  }

  if (store.get(viewerAtom) !== Viewer) {
    store.set(viewerAtom, () => ViewerImpl as FC<ViewerProps>)
  }

  return useMemo(() => ({
    Viewer
  }), [Viewer])
}
