# Rich Data

## Usage

### Basic

```tsx
import '@rich-data/viewer/theme/basic.css'

import { createViewerHook } from '@rich-data/viewer'

const useViewer = createViewerHook()
export const App = () => {
  const { Viewer } = useViewer()
  return (
    <Viewer data={data}/>
  )
}
```

## LICENSE

The MPL 2.0 License
