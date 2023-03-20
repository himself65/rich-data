# @rich-data/viewer

[![npm](https://img.shields.io/npm/v/@rich-data/viewer)](https://www.npmjs.com/package/@rich-data/viewer)
[![npm](https://img.shields.io/npm/dm/@rich-data/viewer.svg)](https://www.npmjs.com/package/@rich-data/viewer)
[![npm](https://img.shields.io/npm/l/@rich-data/viewer)](https://github.com/himself65/data-viewer/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/Himself65/data-viewer/branch/main/graph/badge.svg?token=zt7W58WWVp)](https://codecov.io/gh/Himself65/data-viewer)

This is a React component for JSON viewer, but not only a JSON viewer.

## Usage

### NPM
```shell
npm install @rich-data/viewer
```
### Yarn
```shell
yarn add @rich-data/viewer
```
### PNPM
```shell
pnpm add @rich-data/viewer
```

### Type Declaration

see [src/type.ts](src/type.ts)

### Basic Example

```tsx
import '@rich-data/viewer/theme/base.css'

import { JsonViewer } from '@rich-data/viewer'

const object = { /* my json object */ }
const Component = () => (<JsonViewer value={object}/>)
```

### Customizable data type

```tsx
import '@rich-data/viewer/theme/base.css'

import { JsonViewer, createDataType } from '@rich-data/viewer'

const object = {
  // what if I want to inspect a image?
  image: 'https://i.imgur.com/1bX5QH6.jpg',
  // ... other values
}
const Component = () => (
  <JsonViewer
    value={object}
    // just define it
    valueTypes={[
      {
        is: (value) => typeof value === 'string' && value.startsWith('https://i.imgur.com'),
        Component: (props) => <Image height={50} width={50} src={props.value} alt={props.value}/>,
      },
      // or
      createDataType(
        (value) => typeof value === 'string' && value.startsWith('https://i.imgur.com'),
        (props) => <Image height={50} width={50} src={props.value} alt={props.value}/>,
      )
    ]}
  />
)
```

![Avatar Preview](public/avatar-preview.png)

[see the full code](docs/pages/full/index.tsx)

### Base 16 Theme Support

```tsx
export const ocean: NamedColorspace = {
  scheme: 'Ocean',
  author: 'Chris Kempson (http://chriskempson.com)',
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
}

const Component = () => (
  <JsonViewer
    value={object}
    theme={ocean}
  />
)
```

![Ocean Theme Preview](public/ocean-theme.png)

### Browser

```html
<!DOCTYPE html>
<html lang="en">
<body>
<div id="json-viewer"></div>
<script src="https://cdn.jsdelivr.net/npm/@rich-data/viewer"></script>
<script>
  new JsonViewer({
    value: { /* ... */ }
  }).render()
</script>
</body>
</html>
```

## Features

- [X] 100% TypeScript
- [X] Customizable
    - [X] `keyRenderer` for customize key renderer
    - [X] `valueTypes` for customize any value types you want
    - [X] `light | dark | base16` Theme support
    - [ ] custom metadata
- [X] Support `Next.js` SSR
- [X] `onChange` props allow users to edit value
- [X] Inspect `object`, `Array`, primitive type, even `Map` and `Set` by default.
- [X] Metadata preview, like total items, length of string...
- [X] `Copy to Clipboard` on Click
- [ ] Editor for basic types
- [ ] Fully Test Coverage

## Contributors

<a href="https://github.com/himself65/json-viewer/graphs/contributors"><img src="https://opencollective.com/json-viewer/contributors.svg?width=890&button=false" /></a>

## Acknowledge

This package is originally based on [mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view).

Also thanks open source projects that make this possible.

## Services

![Powered by Vercel](./public/vercel-banner.png)

## LICENSE

This project is licensed under the terms of the [MIT license](LICENSE).
