import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import type { Block, DataValueProps } from '../vanilla'
import { defineBlock } from '../vanilla'

export function StringBlock (props: DataValueProps<string>): ReactElement {
  return (
    <Metadata flavour="official:string">
      <span>
        {props.value}
      </span>
    </Metadata>
  )
}


export const StringBlockPlugin: Block = defineBlock(
  'official:string',
  (value): value is string => typeof value === 'string',
  StringBlock
)

declare module '../vanilla' {
  interface FlavourRegistry {
    'official:string': string
  }
}
