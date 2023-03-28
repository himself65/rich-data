import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import type { ReactElement } from 'react'

export function ArrayBlock (props: DataValueProps<unknown[]>): ReactElement {
  const value = props.value
  const Viewer = props.context.getViewer()
  const currentPath = usePath(value).join('.')
  return (
    <Metadata flavour="official:array">
      <ul className="array-block" data-object-path={currentPath}>
        {value.map((item, index) => {
          return (
            <li key={index}>
              <span>{index}</span> : <Viewer value={item}/>
            </li>
          )
        })}
      </ul>
    </Metadata>
  )
}

export const ArrayBlockPlugin = defineBlock(
  'official:array',
  (value): value is unknown[] => Array.isArray(value),
  ArrayBlock
)

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:array': typeof ArrayBlockPlugin
  }
}
