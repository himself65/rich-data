import type { JsonViewerProps, Path } from '@rich-data/viewer'
import { renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useIsCycleReference } from '../src/hooks/useIsCycleReference'
import {
  createJsonViewerStore,
  JsonViewerProvider
} from '../src/stores/JsonViewerStore'

describe('isCycleReference', () => {
  test('should return path if the reference is a cycle', () => {
    // value -> b -> c -> value
    const value = {
      a: 1,
      b: undefined
    }
    const ref = {
      c: value
    }
    value.b = ref
    const store = createJsonViewerStore(
      { value } satisfies JsonViewerProps<any>)
    const referenceHook = renderHook(({
      path,
      value
    }) => useIsCycleReference(path, value), {
      wrapper: ({ children }) =>
        <JsonViewerProvider value={store}>
          {children}
        </JsonViewerProvider>,
      initialProps: {
        path: ['b', 'c'] as Path,
        value: ref
      }
    })

    expect(referenceHook.result.current).toBe('b')
  })
})
