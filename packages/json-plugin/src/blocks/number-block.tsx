import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import type { ReactElement } from 'react'

export function NumberBlock (props: DataValueProps<number>): ReactElement {
  return (
    <Metadata flavour="official:number">
      <span className="number-block">
        {props.value}
      </span>
    </Metadata>
  )
}

export const NumberBlockPlugin = defineBlock(
  'official:number',
  (value): value is number => typeof value === 'number',
  NumberBlock
)

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:number': typeof NumberBlockPlugin
  }
}
