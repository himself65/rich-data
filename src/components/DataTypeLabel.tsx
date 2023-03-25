import type { FC } from 'react'

import { DataBox } from './mui/DataBox'

export type DataLabelProps = {
  dataType: string
  enable?: boolean
}

export const DataTypeLabel: FC<DataLabelProps> = ({
  dataType
  , enable = true
}) => {
  if (!enable) {
    return null
  }
  return (
    <DataBox className='data-type-label data-viewer-data-type-label'>{dataType}</DataBox>
  )
}
