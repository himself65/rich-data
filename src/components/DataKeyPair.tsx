import clsx from 'clsx'
import type { FC, MouseEvent } from 'react'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useTextColor } from '../hooks/useColor'
import { useClipboard } from '../hooks/useCopyToClipboard'
import { useInspect } from '../hooks/useInspect'
import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { useTypeComponents } from '../stores/typeRegistry'
import type { DataItemProps } from '../type'
import { getValueSize } from '../utils'
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  ContentCopyIcon,
  EditIcon,
  ExpandMoreIcon
} from './Icons'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  nestedIndex?: number
  editable?: boolean
  path: (string | number)[]
}

const IconBox: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = (props) => (
  <span
    {...props}
    className={clsx(props.className, 'data-viewer-icon-box')}
  />
)

export const DataKeyPair: FC<DataKeyPairProps> = (props) => {
  const { value, path, nestedIndex } = props
  const propsEditable = props.editable ?? undefined
  const storeEditable = useJsonViewerStore(store => store.editable)
  const editable = useMemo(() => {
    if (storeEditable === false) {
      return false
    }
    if (propsEditable === false) {
      // props.editable is false which means we cannot provide the suitable way to edit it
      return false
    }
    if (typeof storeEditable === 'function') {
      return !!storeEditable(path, value)
    }
    return storeEditable
  }, [path, propsEditable, storeEditable, value])
  const [tempValue, setTempValue] = useState(typeof value === 'function' ? () => value : value)
  const depth = path.length
  const key = path[depth - 1]
  const hoverPath = useJsonViewerStore(store => store.hoverPath)
  const isHover = useMemo(() => {
    return hoverPath && path.every(
      (value, index) => value === hoverPath.path[index] && nestedIndex ===
        hoverPath.nestedIndex)
  }, [hoverPath, path, nestedIndex])
  const setHover = useJsonViewerStore(store => store.setHover)
  const root = useJsonViewerStore(store => store.value)
  const [inspect, setInspect] = useInspect(path, value, nestedIndex)
  const [editing, setEditing] = useState(false)
  const onChange = useJsonViewerStore(store => store.onChange)
  const keyColor = useTextColor()
  const numberKeyColor = useJsonViewerStore(store => store.colorspace.base0C)
  const { Component, PreComponent, PostComponent, Editor } = useTypeComponents(value, path)
  const quotesOnKeys = useJsonViewerStore(store => store.quotesOnKeys)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = root === value
  const isNumberKey = Number.isInteger(Number(key))

  const enableClipboard = useJsonViewerStore(store => store.enableClipboard)
  const { copy, copied } = useClipboard()

  const actionIcons = useMemo(() => {
    if (editing) {
      return (
          <>
            <IconBox>
              <CloseIcon
                onClick={() => {
                  // abort editing
                  setEditing(false)
                  setTempValue(value)
                }}
              />
            </IconBox>
            <IconBox>
              <CheckIcon
                onClick={() => {
                  // finish editing, save data
                  setEditing(false)
                  onChange(path, value, tempValue)
                }}
              />
            </IconBox>
          </>
      )
    }
    return (
        <>
          {enableClipboard && (
            <IconBox
              onClick={event => {
                event.preventDefault()
                try {
                  copy(
                    path,
                    value
                  )
                } catch (e) {
                  // in some case, this will throw error
                  // for example: circular structure
                  // fixme: `useAlert` hook
                  console.error(e)
                }
              }}
            >
              {
                copied
                  ? (
                    <CheckIcon/>
                    )
                  : (
                    <ContentCopyIcon/>
                    )
              }
            </IconBox>
          )}
          {/* todo: support edit object */}
          {(Editor && editable) &&
            (
              <IconBox
                onClick={event => {
                  event.preventDefault()
                  setEditing(true)
                }}
              >
                <EditIcon/>
              </IconBox>
            )
          }
        </>
    )
  },
  [
    Editor,
    copied,
    copy,
    editable,
    editing,
    enableClipboard,
    onChange,
    path,
    tempValue,
    value
  ])

  const isEmptyValue = useMemo(() => getValueSize(value) === 0, [value])
  const expandable = !isEmptyValue && !!(PreComponent && PostComponent)
  const KeyRenderer = useJsonViewerStore(store => store.keyRenderer)
  const downstreamProps: DataItemProps = useMemo(() => ({
    path,
    inspect,
    setInspect,
    value
  }), [inspect, path, setInspect, value])
  return (
    <div className='data-key-pair'
         data-testid={'data-key-pair' + path.join('.')}
         style={{
           userSelect: 'text'
         }}
         onMouseEnter={
           useCallback(() => setHover(path, nestedIndex),
             [setHover, path, nestedIndex])
         }
    >
      <span
        className='data-key data-viewer-expand-box'
        style={{
          color: keyColor
        }}
        onClick={
          useCallback((event: MouseEvent<HTMLSpanElement>) => {
            if (event.isDefaultPrevented()) {
              return
            }
            if (!isEmptyValue) {
              setInspect(state => !state)
            }
          }, [isEmptyValue, setInspect])
        }
      >
        {
          expandable
            ? (inspect
                ? <ExpandMoreIcon className='data-viewer-cursor-icon' />
                : <ChevronRightIcon className='data-viewer-cursor-icon' />
              )
            : null
        }
        {
          (isRoot
            ? (
                rootName !== false
                  ? (quotesOnKeys ? <>&quot;{rootName}&quot;</> : <>{rootName}</>)
                  : null
              )
            : KeyRenderer.when(downstreamProps)
              ? <KeyRenderer {...downstreamProps} />
              : nestedIndex === undefined && (
                isNumberKey
                  ? <span style={{ color: numberKeyColor }}>{key}</span>
                  : quotesOnKeys ? <>&quot;{key}&quot;</> : <>{key}</>
              )
          )
        }
        {
          (
            isRoot
              ? (rootName !== false
                  ? <DataBox>:</DataBox>
                  : null)
              : nestedIndex === undefined && (
               <DataBox>:</DataBox>
              )
          )
        }
        {PreComponent && <PreComponent {...downstreamProps} />}
        {(isHover && expandable && inspect) && actionIcons}
      </span>
      {
        (editing && editable)
          ? (Editor && <Editor value={tempValue} setValue={setTempValue}/>)
          : (Component)
              ? <Component {...downstreamProps} />
              : <span className='data-value-fallback'>{`fallback: ${value}`}</span>
      }
      {PostComponent && <PostComponent {...downstreamProps} />}
      {(isHover && expandable && !inspect) && actionIcons}
      {(isHover && !expandable) && actionIcons}
    </div>
  )
}
