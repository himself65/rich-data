import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import type { DataValueProps } from '../vanilla'
import { defineBlock } from '../vanilla'

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

declare module '../vanilla' {
  interface BlockFlavourMap {
    'official:number': typeof NumberBlockPlugin
  }
}
