import { Box } from '@mui/material'
import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

type DataBoxProps = ComponentProps<typeof Box>

export const DataBox: FC<DataBoxProps> = props => (
  <Box
    component='div'
    {...props}
    className={clsx('data-box', props.className)}
  />
)
