import '@rich-data/viewer/theme/basic.css'
import '@rich-data/json-plugin/theme/basic.css'

import { createJsonPlugins } from '@rich-data/json-plugin'
import { createViewerHook } from '@rich-data/viewer'
import type { StoryFn } from '@storybook/react'

export default {
  title: 'Viewer'
}

const {
  Viewer,
  Provider
} = createViewerHook({
  plugins: [
    ...createJsonPlugins()
  ]
})

export const Basic: StoryFn = () => {
  return (
    <Provider>
      <Viewer value={1}/>
    </Provider>
  )
}
Basic.args = {

}
