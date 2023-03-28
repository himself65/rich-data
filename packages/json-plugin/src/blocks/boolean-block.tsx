import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import type { ReactElement } from 'react'

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
  (value): value is boolean => typeof value === 'boolean',
  BooleanBlock
)

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:boolean': typeof BooleanBlockPlugin
  }
}
