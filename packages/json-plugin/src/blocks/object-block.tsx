import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Metadata } from '@rich-data/viewer/components/metadata'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import type { ReactElement } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import React, { useState } from 'react'

import { ExpandIcon } from '../components/ExpandIcon.js'

type ObjectBlockHeaderProps = {
  expand: boolean
  setExpand: Dispatch<SetStateAction<boolean>>
}

const ObjectBlockHeader: React.FC<ObjectBlockHeaderProps> = ({
  expand,
  setExpand
}) => {
  return (
    <div onClick={() => setExpand(expand => !expand)}>
      <ExpandIcon expand={expand}/>
      {!expand && (
        <span>&#123;...&#125;</span>
      )}
    </div>
  )
}

export type ObjectBlockBodyProps = {
  expand: boolean
}

const ObjectBlockBody: React.FC<React.PropsWithChildren<ObjectBlockBodyProps>> = ({
  expand,
  children
}) => {
  if (!expand) {
    return null
  }
  return (
    <ul>
      {children}
    </ul>
  )
}

export function ObjectBlock (props: DataValueProps<object>): ReactElement {
  const value = props.value
  const Viewer = props.context.getViewer()
  const currentPath = usePath(value).join('.')
  const [expand, setExpand] = useState(true)
  return (
    <Metadata flavour="official:object">
      <div
        className="object-block"
        data-object-path={currentPath}
      >
        <ObjectBlockHeader
          expand={expand}
          setExpand={setExpand}
        />
        <ObjectBlockBody expand={expand}>
          {Object.entries(value).map(([key, item]) => {
            return (
              <li key={key}>
                <span>{key}</span> : <Viewer value={item}/>
              </li>
            )
          })}
        </ObjectBlockBody>
      </div>
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
