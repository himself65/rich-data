import { style } from '@vanilla-extract/css'

export const colorPaletteRootStyle = style({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const colorPaletteCircleStyle = style({
  width: '0.75rem',
  height: '0.75rem',
  borderRadius: '50%',
})

export const colorPaletteStringStyle = style({
  marginLeft: '0.2rem'
})
