import type { Plugin } from '@rich-data/viewer'
import {
  createViewerHook,
  defineBlock
} from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { ThemePlugin } from '@rich-data/viewer/middleware/theme'

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
  createStore
} = createViewerHook({
  plugins: [
    StringBlockPlugin,
    MyNumberPlugin,
    MyArrayPlugin,
    TestPlugin,
    ThemePlugin
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
            context.getTheme().mode === 'light' ? 'dark' : 'light')
        }}
      >change theme
      </button>
      <Viewer value={[1, '2']}/>
    </>
  )
}

const store1 = createStore()
const store2 = createStore()

export function App () {
  const { Provider } = useViewer()

  return (
    <>
      <Provider store={store1}>
        <Example/>
      </Provider>
      <Provider store={store2}>
        <Example/>
      </Provider>
    </>
  )
}
