import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { Tag } from '@rich-data/viewer/components/tag'
import type { ReactElement } from 'react'

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

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:string': typeof StringBlockPlugin
  }
}
