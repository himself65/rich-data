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
import type { ReactElement } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import React, { useCallback } from 'react'

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
    <div className="object-block-header"
         onClick={() => setExpand(expand => !expand)}>
      <ExpandIcon expand={expand}/>
      {!expand && (
        <span>&#123;...&#125;</span>
      )}
      {expand && (
        <span>&#123;</span>
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
    <ul className="object-block-body">
      {children}
    </ul>
  )
}

type ObjectBlockFooterProps = {
  expand: boolean
}

const ObjectBlockFooter: React.FC<ObjectBlockFooterProps> = ({
  expand
}) => {
  if (!expand) {
    return null
  }
  return (
    <div className="object-block-footer">
      <span>&#125;</span>
    </div>
  )
}

type ObjectBlockProps = DataValueProps<object> & {
  nested?: boolean
}

function NestedObject (props: ObjectBlockProps): ReactElement {
  const value = props.value
  const Viewer = useContext().getViewer()
  const currentPath = usePath(value).join('.')
  const [expand, setExpand] = useCachedBooleanState(currentPath, true)
  return (
    <Metadata flavour="official:object">
        <span
          className="object-block"
          data-object-path={currentPath}
        >
          <span
            onClick={useCallback(() => {
              setExpand(expand => !expand)
            }, [setExpand])}
          >
            <ExpandIcon expand={expand}/>
            &#123;
          </span>
          <ObjectBlockBody expand={expand}>
            {Object.entries(value).map(([key, item]) => {
              if (typeof item === 'object') {
                return (
                  <li key={key}>
                    <span>{key}</span>
                    <Colon/>
                    <ObjectBlock value={item} nested={true}/>
                  </li>
                )
              }
              return (
                <li key={key}>
                  <span>{key}</span>
                  <Colon/>
                  <Viewer value={item}/>
                </li>
              )
            })}
          </ObjectBlockBody>
          <span>
            &#125;
          </span>
        </span>
    </Metadata>
  )
}

export function ObjectBlock (props: ObjectBlockProps): ReactElement {
  const value = props.value
  const Viewer = useContext().getViewer()
  const currentPath = usePath(value).join('.')
  const [expand, setExpand] = useCachedBooleanState(currentPath, true)
  if (props.nested) {
    return (
      <NestedObject {...props}/>
    )
  }
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
            if (typeof item === 'object') {
              return (
                <li key={key}>
                  <span>{key}</span>
                  <Colon/>
                  <ObjectBlock value={item} nested={true}/>
                </li>
              )
            }
            return (
              <li key={key}>
                <span>{key}</span>
                <Colon/>
                <Viewer value={item}/>
              </li>
            )
          })}
        </ObjectBlockBody>
        <ObjectBlockFooter expand={expand}/>
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
