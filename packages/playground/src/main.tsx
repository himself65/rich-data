import { Plugin, createViewerHook } from '@rich-data/viewer'
import { createRoot } from 'react-dom/client'

declare module '@rich-data/viewer' {
  interface FlavourRegistry {
    my_number: number
  }
}

const plugins: Plugin[] = [
  {
    flavour: 'my_number',
    typeRenderer: {
      flavour: 'my_number',
      is: value => typeof value === 'number',
      Component: ({ value }) => <span> this is number {value}</span>
    }
  } as Plugin<'my_number'>
]

const useViewer = createViewerHook({
  plugins
})

export function App () {
  const { Viewer } = useViewer()
  return (
    <Viewer value={1}/>
  )
}

const root = createRoot(document.getElementById('app'))

root.render(<App/>)
