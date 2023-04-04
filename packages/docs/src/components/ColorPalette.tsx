import { createColorPaletteBlock } from '@rich-data/color-palette-plugin'
import { createJsonPlugins } from '@rich-data/json-plugin'
import { createViewerHook } from '@rich-data/viewer'

const value = {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
}

const { Viewer, Provider } = createViewerHook({
  plugins: [
    createColorPaletteBlock(),
    ...createJsonPlugins()
  ]
})

export const ColorPalette = () => {
  return (
    <Provider>
      <Viewer value={value}/>
    </Provider>
  )
}
