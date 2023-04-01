import '@rich-data/viewer/theme/basic.css'
import '@rich-data/json-plugin/theme/basic.css'

import { createJsonPlugins } from '@rich-data/json-plugin'
import { createViewerHook } from '@rich-data/viewer'
import { useCopy } from '@rich-data/viewer/hooks/use-copy'
import { expect } from '@storybook/jest'
import type { StoryFn } from '@storybook/react'
import { useCallback } from 'react'

import packageJson from '../package.json'

export default {
  title: 'Viewer'
}

const {
  Viewer,
  Provider
} = createViewerHook({
  plugins: [
    ...createJsonPlugins()
  ]
})

const Toolbar = () => {
  const handleCopy = useCopy()
  return (
    <div>
      <button
        data-testid="copy-button"
        onClick={useCallback(() => handleCopy(1), [handleCopy])}>
        copy
      </button>
    </div>
  )
}

export const Number: StoryFn = () => {
  return (
    <Provider>
      <Toolbar/>
      <Viewer value={114514}/>
    </Provider>
  )
}

Number.play = async ({ canvasElement }) => {
  await new Promise(resolve => setTimeout(resolve, 50))
  const numberElement = canvasElement.querySelector('.number-block') as HTMLElement
  expect(numberElement).not.toBeNull()
  expect(numberElement.textContent).toBe('114514')
}

export const String: StoryFn = () => {
  return (
    <Provider>
      <Viewer value="hello, world!"/>
    </Provider>
  )
}

export const Object: StoryFn = () => {
  return (
    <Provider>
      <Viewer value={packageJson}/>
    </Provider>
  )
}

export const NestedObject: StoryFn = () => {
  return (
    <Provider>
      <Viewer value={{
        a: {
          1: {
            2: {}
          },
          f: '123',
          b: {
            c: {
              d: {
                e: {}
              }
            }
          }
        }
      }}/>
    </Provider>
  )
}
