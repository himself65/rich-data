import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import type { DataValueProps } from '../vanilla'
import { defineBlock } from '../vanilla'

export function BooleanBlock (props: DataValueProps<boolean>): ReactElement {
  return (
    <Metadata flavour="official:boolean">
      <span className="boolean-block">
        {props.value}
      </span>
    </Metadata>
  )
}

export const BooleanBlockPlugin = defineBlock(
  'official:boolean',
  (value): value is boolean => value === null,
  BooleanBlock
)

declare module '../vanilla' {
  interface BlockFlavourMap {
    'official:boolean': typeof BooleanBlockPlugin
  }
}
