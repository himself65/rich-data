import '@rich-data/viewer/theme/basic.css'
import '@rich-data/json-plugin/theme/basic.css'

import { createJsonPlugins } from '@rich-data/json-plugin'
import { createViewerHook } from '@rich-data/viewer'
import type { StoryFn } from '@storybook/react'

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

export const Number: StoryFn = () => {
  return (
    <Provider>
      <Viewer value={114514}/>
    </Provider>
  )
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
