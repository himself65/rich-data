import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import type { Dispatch, ReactElement, SetStateAction } from 'react'
import React, { useState } from 'react'

import { ExpandIcon } from '../components/ExpandIcon.js'

type ArrayBlockHeaderProps = {
  expand: boolean
  setExpand: Dispatch<SetStateAction<boolean>>
}

const ArrayBlockHeader: React.FC<ArrayBlockHeaderProps> = ({
  expand,
  setExpand
}) => {
  return (
    <div className="array-block-header" onClick={
      () => setExpand(expand => !expand)
    }>
      <ExpandIcon expand={expand}/>
      {!expand && (
        <span>[...]</span>
      )}
    </div>
  )
}

export type ArrayBlockBodyProps = {
  expand: boolean
}

const ArrayBlockBody: React.FC<React.PropsWithChildren<ArrayBlockBodyProps>> = ({
  expand,
  children
}) => {
  if (!expand) {
    return null
  }
  return (
    <ul className="array-block-body">
      {children}
    </ul>
  )
}

export function ArrayBlock (props: DataValueProps<unknown[]>): ReactElement {
  const value = props.value
  const Viewer = props.context.getViewer()
  const [expand, setExpand] = useState(true)
  const currentPath = usePath(value).join('.')
  return (
    <Metadata flavour="official:array">
      <div className="array-block" data-object-path={currentPath}>
        <ArrayBlockHeader expand={expand} setExpand={setExpand}/>
        <ArrayBlockBody expand={expand}>
          {value.map((item, index) => {
            return (
              <li key={index}>
                <span>{index}</span> : <Viewer value={item}/>
              </li>
            )
          })}
        </ArrayBlockBody>
      </div>
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
