import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

// get HTMLDivElement
type DataBoxProps = ComponentProps<'div'>

export const DataBox: FC<DataBoxProps> = props => (
  <div
    {...props}
    className={clsx('data-box', props.className)}
  />
)
