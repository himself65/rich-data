import type { Plugin } from '@rich-data/viewer'
import { createViewerHook, defineBlock } from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { useContext as useViewerContext } from '@rich-data/viewer/hooks/use-context'
import { ThemePlugin } from '@rich-data/viewer/middleware/theme'

const useContext = useViewerContext<
  [
    ['rich-data/theme', unknown],
    ['my-plugin', unknown]
  ]
>;

type MyPluginMiddleware<C, A> = {
  ping: () => void
}

declare module '@rich-data/viewer' {
  interface FlavourRegistry {
    my_number: number
    my_array: unknown[]
  }

  interface ContextMutators<C, A> {
    ['my-plugin']: MyPluginMiddleware<C, A>
  }
}

const MyNumberPlugin: Plugin = {
  block: defineBlock(
    'my_number',
    value => typeof value === 'number',
    function MyNumber ({ value }) {
      const context = useContext()
      const theme = context.useTheme()
      return (
        <Metadata flavour="my_number">
          <span>
            this is number {value}
            <br/>
            theme: {theme.mode}
            <button
              onClick={() => {
                context.ping()
              }}
            >
              click me
            </button>
          </span>
        </Metadata>
      )
    }
  )
}

const MyArrayPlugin: Plugin = {
  block: defineBlock(
    'my_array',
    value => Array.isArray(value),
    function MyArray ({ value }) {
      const context = useContext()
      const Viewer = context.getViewer()
      return (
        <ul>
          {value.map((item, index) => {
            return (
              <li key={index}>
                <Viewer value={item}/>
              </li>
            )
          })}
        </ul>
      )
    }
  )
}

const TestPlugin: Plugin = {
  id: 'my-plugin',
  middleware: (_store) => {
    return {
      ping: () => {
        console.log('ping')
      }
    }
  }
}

const useViewer = createViewerHook<[['rich-data/theme', unknown]]>({
  plugins: [
    StringBlockPlugin,
    MyNumberPlugin,
    MyArrayPlugin,
    TestPlugin,
    ThemePlugin
  ]
})

export function App () {
  const { Viewer, context } = useViewer()
  return (
    <>
      <button
        onClick={() => {
          context.setTheme(context.getTheme().mode === 'light' ? 'dark' : 'light')
        }}
      >change theme</button>
      <Viewer value={[1, '2']}/>
    </>
  )
}
