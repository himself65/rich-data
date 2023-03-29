# Rich Data

> v3 version is on heavy development. Please use v2 for stable version.

[![npm version](https://badgen.net/npm/v/@rich-data/viewer/latest)](https://www.npmjs.com/package/@rich-data/viewer)
[![npm version](https://badgen.net/npm/v/@rich-data/viewer/nightly)](https://www.npmjs.com/package/@rich-data/viewer)
[![minified size](https://badgen.net/bundlephobia/minzip/@rich-data/viewer)](https://bundlephobia.com/package/@rich-data/viewer@nightly)

> Rich Data provides a powerful and flexible way to display data in your React.

- Minimal core (3Kb), full featured (20Kb)
- Rich data structure preview support (object, JSON, JSX, `Y.Doc`...)
- React 18 Suspense
- Headless UI
- Customizable UI / Logic
- 100% Strong typed

## Core Concept

### Viewer

The `Viewer` component is the core of Rich Data. 
It is a React component that can render any data structure you provider.

```tsx
const {
  Viewer,
  useContext,
  Provider,
} = createViewerHook({
  plugins: [
    // ...
  ]
})
```

### Plugin

Plugin is the basic unit of Viewer. Which connect the viewer between data structure, UI, and logic. 

You can inject function into whole Viewer by using `middleware`.
  
```tsx
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

const data = {/* your data here */}

const Component = () => {
  const context = useContext()

  return (
    <>
      <button onClick={() => context.ping()}>
        Ping
      </button>
      <Viewer
        data={data}
      />
    </>
  )
}

const App = () => {
  return (
    <Provider>
      <Component />
    </Provider>
  )
}
```

Or you can render your own data structure you like,
by using `defineBlock` helper function.

```tsx
const MyImageBlock = defineBlock(
  'my_image',
  (value): value is string => value.startsWith('http'),
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
```

## Ecosystem

We builtin some basic plugins for you to use.

### JSON

```tsx
import { createJsonPlugins } from '@rich-data/json-plugin'

const {
  Viewer,
  useContext,
  Provider,
} = createViewerHook({
  plugins: [
    ...createJsonPlugins()
  ]
})
```

### JSX (🚧)

### `Y.Doc` (🚧)

## LICENSE

The MPL 2.0 License
