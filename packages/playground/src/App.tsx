import type { Plugin } from '@rich-data/viewer'
import {
  createViewerHook,
  defineBlock
} from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { useTheme } from '@rich-data/viewer/hooks/use-theme'
import { ThemeMode, ThemePlugin } from '@rich-data/viewer/middleware/theme'

type MyPluginMiddleware<C, A> = {
  ping: () => void
}

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    my_number: typeof MyNumberPlugin
    my_array: typeof MyArrayPlugin
  }

  interface ContextMutators<C, A> {
    'my-plugin': MyPluginMiddleware<C, A>
  }
}

const MyNumberPlugin = defineBlock(
  'my_number',
  (value): value is number => typeof value === 'number',
  function MyNumber ({ value }) {
    const context = useContext()
    const theme = useTheme()
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

const MyArrayPlugin = defineBlock(
  'my_array',
  (value): value is unknown[] => Array.isArray(value),
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

const TestPlugin = {
  id: 'my-plugin',
  middleware: (_store) => {
    return {
      ping: () => {
        console.log('ping')
      }
    }
  }
} satisfies Plugin

const {
  useViewer,
  useContext,
  Provider
} = createViewerHook({
  plugins: [
    StringBlockPlugin,
    MyNumberPlugin,
    MyArrayPlugin,
    TestPlugin,
    ThemePlugin({
      defaultMode: ThemeMode.Light
    })
  ] as const
})

function Example () {
  const { Viewer } = useViewer()
  const context = useContext()
  return (
    <>
      <button
        onClick={() => {
          context.setTheme(
            context.getTheme().mode === 'light' ? ThemeMode.Dark : ThemeMode.Light)
        }}
      >change theme
      </button>
      <Viewer value={[1, '2']}/>
    </>
  )
}

export function App () {
  return (
    <>
      <Provider>
        <Example/>
      </Provider>
      <Provider>
        <Example/>
      </Provider>
    </>
  )
}
