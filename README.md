# Rich Data

> v3 version is heavily under development. Please use v2 as the current stable version.

[![npm version](https://badgen.net/npm/v/@rich-data/viewer/latest)](https://www.npmjs.com/package/@rich-data/viewer)
[![npm version](https://badgen.net/npm/v/@rich-data/viewer/nightly)](https://www.npmjs.com/package/@rich-data/viewer)
[![minified size](https://badgen.net/bundlephobia/minzip/@rich-data/viewer)](https://bundlephobia.com/package/@rich-data/viewer@nightly)

> Rich Data provides a powerful and flexible way to display "raw" data in your React UI.

- Minimal core (3Kb), full featured (20Kb)
- Rich data structure preview support (object, JSON, JSX, `Y.Doc`...)
- Supports React 18 Suspense
- Offers a "headless UI"
- Customizable UI / Logic
- 100% Strongly typed

## Demos and Examples

See the [rich-data.dev website](https://rich-data.dev/) for running demos and code examples.

## Core Concepts

### Viewer

The `Viewer` component is the core of Rich Data. 
It is a React component that can render any data structure you provide.

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

Plugin is the basic unit of Rich Data that connects the Viewer to your data structure, applying UI and logic. 

You can inject arbitrary functionality into the Viewer by using `middleware`.
  
```tsx
const TestPlugin = defineMiddleware({
  id: 'my-plugin',
  middleware: (_store) => {
    return {
      ping: () => {
        console.log('ping')
      }
    }
  }
})

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

Or you can render your own data structure as you like,
by using a `defineBlock` helper function.

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

Rich Data provides a number of builtin plugins.

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
