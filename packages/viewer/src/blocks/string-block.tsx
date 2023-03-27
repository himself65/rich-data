import type { ReactElement } from 'react'

import { Metadata } from '../components/metadata'
import { Tag } from '../components/tag'
import type { DataValueProps } from '../vanilla'
import { defineBlock } from '../vanilla'

export function StringBlock (props: DataValueProps<string>): ReactElement {
  return (
    <Metadata flavour="official:string">
      <span className='string-block'>
        <Tag flavour="string"/>
        &quot;{props.value}&quot;
      </span>
    </Metadata>
  )
}


export const StringBlockPlugin = defineBlock(
  'official:string',
  (value): value is string => typeof value === 'string',
  StringBlock
)

declare module '../vanilla' {
  interface BlockFlavourMap {
    'official:string': typeof StringBlockPlugin
  }
}
