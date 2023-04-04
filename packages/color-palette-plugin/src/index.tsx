import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'

import {
  colorPaletteCircleStyle,
  colorPaletteRootStyle,
  colorPaletteStringStyle
} from './index.css.js'

export function createColorPaletteBlock () {
  return defineBlock(
    'official:color-palette',
    (value): value is string => {
      if (typeof value === 'string') {
        if (/^#[0-9a-f]{6}$/i.test(value)) {
          return true
        } else if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+(?:\.\d+)?)?\s*\)$/i.test(
          value)) {
          return true
        }
      }
      return false
    },
    ({ value }) => {
      return (
        <Metadata flavour="official:color-palette">
          <div className={colorPaletteRootStyle}>
            <div
              className={colorPaletteCircleStyle}
              style={{
                backgroundColor: value
              }}
            />
            <span
              className={colorPaletteStringStyle}
              style={{
                color: 'var(--viewer-base0B)'
              }}
            >
              {value}
            </span>
          </div>
        </Metadata>
      )
    }
  )
}

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:color-palette': ReturnType<typeof createColorPaletteBlock>
  }
}
