import type { ReactElement } from 'react'

export function Tag (props: {
  flavour: string
}): ReactElement {
  return (
    <span className='rich-data--viewer-tag'>
      {props.flavour}
    </span>
  )
}
