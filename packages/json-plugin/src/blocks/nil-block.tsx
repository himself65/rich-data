import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { clsx } from 'clsx'
import type { ReactElement } from 'react'

export function NilBlock (props: DataValueProps<null | undefined>): ReactElement {
  return (
    <Metadata flavour="official:nil">
      <span className={clsx(
        props.value === undefined ? 'undefined-block' : 'null-block')}
      >
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

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:nil': typeof NilBlockPlugin
  }
}
