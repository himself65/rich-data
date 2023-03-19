import type { ReactElement } from 'react'

export type ViewerProps<Data> = {
  data: Data
}

export function Viewer<Data> (props: ViewerProps<Data>): ReactElement {
  return <div className='data-viewer'>Viewer</div>
}
