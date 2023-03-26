import type { Plugin } from '@rich-data/viewer'
import { createViewerHook } from '@rich-data/viewer'
import { StringBlockPlugin } from '@rich-data/viewer/blocks/string-block'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { useContext } from '@rich-data/viewer/hooks/use-context'

declare module '@rich-data/viewer' {
  interface FlavourRegistry {
    my_number: number
    my_array: unknown[]
  }
}

const MyNumberPlugin = {
  flavour: 'my_number',
  typeRenderer: {
    flavour: 'my_number',
    is: value => typeof value === 'number',
    Component: function MyString ({ value }) {
      return (
        <Metadata flavour="my_number">
          <span> this is number {value}</span>
        </Metadata>
      )
    }
  }
} satisfies Plugin<'my_number'>

const MyArrayPlugin = {
  flavour: 'my_array',
  typeRenderer: {
    flavour: 'my_array',
    is: value => Array.isArray(value),
    Component: function MyArray ({ value }) {
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
  }
} satisfies Plugin<'my_array'>

const useViewer = createViewerHook({
  plugins: [
    StringBlockPlugin,
    MyNumberPlugin,
    MyArrayPlugin
  ]
})

export function App () {
  const { Viewer } = useViewer()
  return (
    <Viewer value={[1, '2']}/>
  )
}
