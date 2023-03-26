import { Provider, createStore, useAtomValue } from 'jotai'
import {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo, useRef
} from 'react'
import { typeRenderersAtom } from './atom'
import {
  Store,
  ViewerProps,
  Context,
  Plugin, createContext
} from './vanilla'

function ViewerProvider (props: PropsWithChildren<{
  store: Store
}>): ReactElement {
  return (
    <Provider store={props.store}>
      {props.children}
    </Provider>
  )
}

function useTypeRenderer (value: unknown) {
  const typeRenderers = useAtomValue(typeRenderersAtom)
  return useMemo(
    () => typeRenderers.find(typeRenderer => typeRenderer.is(value)),
    []
  )
}

function ViewerImpl<Value = unknown> (props: ViewerProps<Value>): ReactElement {
  const typeRenderer = useTypeRenderer(props.value)
  return (
    <div data-flavour={typeRenderer.flavour}>
    </div>
  )
}


declare module './vanilla' {
  interface FlavourRegistry {
    unknown: unknown
  }
}

const fallbackPlugin: Plugin = {
  register (context) {
    context.addDataTypeRenderer({
      flavour: 'unknown',
      is: () => true,
      Component: ({ value }) => <span data-flavour="unknown">{JSON.stringify(
        value)}</span>
    })
    return () => {
      context.removeDataTypeRenderer('unknown')
    }
  }
}

interface ViewerHookConfig<Value = unknown> {
  plugins?: Plugin[]
}

export function useBlankViewer<Value = unknown> (config?: ViewerHookConfig<Value>) {
  const storeRef = useRef<Store>(undefined)
  if (!storeRef.current) {
    storeRef.current = createStore()
  }
  const contextRef = useRef<Context>(undefined)
  if (!contextRef.current) {
    contextRef.current = createContext()
  }

  useEffect(() => {
    if (config.plugins) {
      const plugins = [fallbackPlugin, ...config.plugins].reverse()
      const dispose = plugins.map(plugin => plugin.register(contextRef.current))
      return () => {
        dispose.forEach(fn => fn())
      }
    }
  }, [config.plugins])

  const Viewer = useMemo(() =>
      function Viewer (props: ViewerProps<Value>): ReactElement {
        return (
          <ViewerProvider store={storeRef.current}>
            <ViewerImpl {...props}/>
          </ViewerProvider>
        )
      }
    , []
  )

  return useMemo(() => ({
    Viewer
  }), [])
}

const internalPlugins: Plugin[] = []

export function useViewer<Value = unknown> (config?: ViewerHookConfig<Value>) {
  return useBlankViewer({
    ...config,
    plugins: [...internalPlugins, ...(config?.plugins ?? [])]
  })
}
