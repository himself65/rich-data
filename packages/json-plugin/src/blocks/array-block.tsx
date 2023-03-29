import type { DataValueProps } from '@rich-data/viewer'
import { defineBlock } from '@rich-data/viewer'
import { Colon } from '@rich-data/viewer/components/colon'
import { Metadata } from '@rich-data/viewer/components/metadata'
import {
  useCachedBooleanState
} from '@rich-data/viewer/hooks/use-cached-boolean-state'
import {
  useContext
} from '@rich-data/viewer/hooks/use-context'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import type { Dispatch, ReactElement, SetStateAction } from 'react'
import React from 'react'

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
      {expand && (
        <span>[</span>
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

type ArrayBlockFooterProps = {
  expand: boolean
}

const ArrayBlockFooter: React.FC<ArrayBlockFooterProps> = ({
  expand
}) => {
  if (!expand) {
    return null
  }
  return (
    <div className="array-block-footer">
      <span>]</span>
    </div>
  )
}

export function ArrayBlock (props: DataValueProps<unknown[]>): ReactElement {
  const value = props.value
  const Viewer = useContext().getViewer()
  const currentPath = usePath(value).join('.')
  const [expand, setExpand] = useCachedBooleanState(currentPath, true)
  return (
    <Metadata flavour="official:array">
      <div className="array-block" data-object-path={currentPath}>
        <ArrayBlockHeader expand={expand} setExpand={setExpand}/>
        <ArrayBlockBody expand={expand}>
          {value.map((item, index) => {
            return (
              <li key={index}>
                <span>{index}</span>
                <Colon/>
                <Viewer value={item}/>
              </li>
            )
          })}
        </ArrayBlockBody>
        <ArrayBlockFooter expand={expand}/>
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
