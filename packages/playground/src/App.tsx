import { createJsonPlugins } from '@rich-data/json-plugin'
import type {
  Plugin
} from '@rich-data/viewer'
import {
  createViewerHook,
  defineBlock
} from '@rich-data/viewer'
import { ThemeMode, ThemePlugin } from '@rich-data/viewer/middleware/theme'
import { DevTools } from 'jotai-devtools'
import type { FC } from 'react'
import { Suspense } from 'react'
import useSWR, { SWRConfig } from 'swr'

type MyPluginMiddleware<C, A> = {
  ping: () => void
}

declare module '@rich-data/viewer' {
  interface ContextMutators<C, A> {
    'my_image': typeof MyImageBlock;
    'my-plugin': MyPluginMiddleware<C, A>
  }
}

function createSuspenseWrapper <Props>(
  Component: FC<Props>
) {
  return function SuspenseWrapper (props: Props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Component {...props as any}/>
      </Suspense>
    )
  }
}

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
  createSuspenseWrapper(function MyImage ({ value }) {
    const { data } = useSWR(value, {
      fetcher: url => fetch(url).then(res => res.blob()),
      suspense: true
    })
    const url = data ? URL.createObjectURL(data) : ''
    return (
      <img alt={value} height={50} width={50} src={url}/>
    )
  })
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
    ...createJsonPlugins(),
    TestPlugin,
    // TestAsyncPlugin,
    ThemePlugin({
      defaultMode: ThemeMode.Light
    })
  ] as const
})

function Full () {
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

function Basic () {
  const { Viewer } = useViewer()
  return (
    <>
      <Provider>
        <Viewer value={114514}/>
      </Provider>
      <Provider>
        <Viewer value="hello, world!"/>
      </Provider>
      <Provider>
        <Viewer value={true}/>
      </Provider>
    </>
  )
}

export function App () {
  return (
    <>
      <SWRConfig value={{
        suspense: true
      }}>
        <Provider>
          <Full/>
        </Provider>
      </SWRConfig>
      <Basic/>
    </>
  )
}
