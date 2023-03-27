import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import type { DataValueProps } from '../vanilla'
import { defineBlock } from '../vanilla'

export function NilBlock (props: DataValueProps<null | undefined>): ReactElement {
  return (
    <Metadata flavour="official:nil">
      <span className="nil-block">
        {props.value}
      </span>
    </Metadata>
  )
}

export const NilBlockPlugin = defineBlock(
  'official:nil',
  (value): value is (null | undefined) => value == null,
  NilBlock
)

declare module '../vanilla' {
  interface BlockFlavourMap {
    'official:nil': typeof NilBlockPlugin
  }
}
