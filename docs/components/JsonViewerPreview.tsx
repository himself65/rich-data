import type { JsonViewerProps } from '@rich-data/viewer'
import { JsonViewer } from '@rich-data/viewer'
import type { FC } from 'react'

export const JsonViewerPreview: FC<JsonViewerProps> = (props) => {
  return (
    <JsonViewer
      theme='auto'
      style={{
        fontSize: 12
      }}
      value={props.value}
    />
  )
}
