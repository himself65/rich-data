import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import type { ReactElement } from 'react'

export function ObjectBlock (props: DataValueProps<object>): ReactElement {
  const value = props.value
  const Viewer = props.context.getViewer()
  const currentPath = usePath(value).join('.')
  return (
    <Metadata flavour="official:object">
      <ul className="object-block" data-object-path={currentPath}>
        {Object.entries(value).map(([key, item]) => {
          return (
            <li key={key}>
              <span>{key}</span> : <Viewer value={item}/>
            </li>
          )
        })}
      </ul>
    </Metadata>
  )
}

export const ObjectBlockPlugin = defineBlock(
  'official:object',
  (value): value is object => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  },
  ObjectBlock
)

declare module '@rich-data/viewer' {
  interface BlockFlavourMap {
    'official:object': typeof ObjectBlockPlugin
  }
}
