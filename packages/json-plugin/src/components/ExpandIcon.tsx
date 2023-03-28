import { IconChevronDown } from '@tabler/icons-react'
import type { ReactElement } from 'react'

export type ExpandIconProps = {
  expand: boolean
}

export function ExpandIcon ({ expand }: ExpandIconProps): ReactElement {
  return (
    <IconChevronDown
      className="rich-data--viewer-icon interactive"
      transform={
        expand ? 'rotate(0)' : 'rotate(-90)'
      }/>
  )
}
