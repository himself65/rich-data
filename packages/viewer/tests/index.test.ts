import { createViewerHook } from '@rich-data/viewer'
import { describe, expect, test } from 'vitest'

describe('basic', () => {
  test('createViewerHook', () => {
    const { Viewer, Provider, useContext } = createViewerHook({
      plugins: []
    })
    expect(Viewer).toBeInstanceOf(Function)
    expect(Provider).toBeInstanceOf(Function)
    expect(useContext).toBeInstanceOf(Function)
  })
})
