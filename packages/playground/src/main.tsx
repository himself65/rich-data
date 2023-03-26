import type { Plugin} from '@rich-data/viewer';
import { createViewerHook } from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { createRoot } from 'react-dom/client'

declare module '@rich-data/viewer' {
  interface FlavourRegistry {
    my_number: number
  }
}

const MyNumberPlugin = {
  flavour: 'my_number',
  typeRenderer: {
    flavour: 'my_number',
    is: value => typeof value === 'number',
    Component: ({ value }) => <span> this is number {value}</span>
  }
} as Plugin<'my_number'>

const useViewer = createViewerHook({
  plugins: [
    StringBlockPlugin,
    MyNumberPlugin
  ]
})

export function App () {
  const { Viewer } = useViewer()
  return (
    <Viewer value={1}/>
  )
}

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(<App/>)
