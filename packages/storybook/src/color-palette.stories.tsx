import { createColorPaletteBlock } from '@rich-data/color-palette-plugin'
import { createViewerHook } from '@rich-data/viewer'
import type { StoryFn } from '@storybook/react'

export default {
  title: 'Color Palette'
}

const { Viewer, Provider } = createViewerHook({
  plugins: [
    createColorPaletteBlock()
  ]
})

export const Example: StoryFn = () => {
  return (
    <div>
      <Provider>
        <Viewer value={'rgb(100, 200, 255)'}/>
      </Provider>
    </div>
  )
}
