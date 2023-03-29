import { createJsonPlugins } from '@rich-data/json-plugin'
import { createViewerHook } from '@rich-data/viewer'

const value = {
  number: 114514,
  hello: 'world',
  array: [1, 2, 3, 4, 5]
}

const { Viewer, Provider } = createViewerHook({
  plugins: [
    ...createJsonPlugins()
  ]
})

export const HelloWorld = () => {
  return (
    <Provider>
      <Viewer value={value}/>
    </Provider>
  )
}
