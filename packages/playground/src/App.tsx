import type { Plugin } from '@rich-data/viewer'
import {
  createViewerHook,
  defineBlock
} from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import { useTheme } from '@rich-data/viewer/hooks/use-theme'
import { ThemeMode, ThemePlugin } from '@rich-data/viewer/middleware/theme'
import { DevTools } from 'jotai-devtools'
import useSWR, { SWRConfig } from 'swr'

type MyPluginMiddleware<C, A> = {
  ping: () => void
}

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    my_number: typeof MyNumberPlugin
    my_array: typeof MyArrayBlock
    my_object: typeof MyObjectBlock
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

const MyImageBlock = defineBlock(
  'my_image',
  (value): value is string => {
    if (typeof value === 'string') {
      try {
        new URL(value)
        return true
      } catch (e) {
        return false
      }
    }
    return false
  },
  function MyImage ({ value }) {
    const { data } = useSWR(value, {
      fetcher: url => fetch(url).then(res => res.blob()),
      suspense: true
    })
    const url = data ? URL.createObjectURL(data) : ''
    return (
      <img alt={value} height={50} width={50} src={url}/>
    )
  }
)

const MyObjectBlock = defineBlock(
  'my_object',
  (value): value is object => {
    return typeof value === 'object' && value !== null
  },
  function MyObject ({ value }) {
    const context = useContext()
    const Viewer = context.getViewer()
    const currentPath = usePath(value)
    console.log('currentPath', currentPath)
    return (
      <ul>
        {Object.entries(value).map(([key, item]) => {
          return (
            <li key={key} data-object-path={currentPath.join('.')}>
              <span>{key}</span> : <Viewer value={item}/>
            </li>
          )
        })}
      </ul>
    )
  }
)

const MyArrayBlock = defineBlock(
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
              <span>{index}</span> : <Viewer value={item}/>
            </li>
          )
        })}
      </ul>
    )
  }
)

const TestPlugin = {
  id: 'my-plugin',
  effect: () => () => void 0,
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
  Provider,
  getStore
} = createViewerHook({
  plugins: [
    MyImageBlock,
    StringBlockPlugin,
    MyNumberPlugin,
    MyArrayBlock,
    MyObjectBlock,
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
      <DevTools store={getStore()}/>
      <button
        onClick={() => {
          context.setTheme(
            context.getTheme().mode === 'light'
              ? ThemeMode.Dark
              : ThemeMode.Light)
        }}
      >change theme
      </button>
      <Viewer value={[
        1,
        '2',
        'https://i.imgur.com/Mx7dA2Y.jpg',
        {
          foo: 'bar',
          baz: 123,
          nested: {
            qux: -1
          }
        }
      ]}/>
    </>
  )
}

export function App () {
  return (
    <SWRConfig value={{
      suspense: true
    }}>
      <Provider>
        <Example/>
      </Provider>
      <Provider>
        <Example/>
      </Provider>
    </SWRConfig>
  )
}
