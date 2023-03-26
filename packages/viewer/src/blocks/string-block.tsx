import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import type { DataValueProps, Plugin } from '../vanilla'
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


export const StringBlockPlugin: Plugin = {
  block: defineBlock(
    'official:string',
    (value): value is string => typeof value === 'string',
    StringBlock
  )
}

declare module '../vanilla' {
  interface FlavourRegistry {
    'official:string': string
  }
}
