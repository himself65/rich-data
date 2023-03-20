import { Box } from '@mui/material'
import type { ComponentProps, FC } from 'react'

type DataBoxProps = ComponentProps<typeof Box>

export const DataBox: FC<DataBoxProps> = props => (
  <Box
    component='div'
    {...props}
    className={'data-box ' + props.className}
  />
)
