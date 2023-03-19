import type { Path } from '@rich-data/viewer'
import { renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useIsCycleReference } from '../src/hooks/useIsCycleReference'
import { createWrapper } from './utils'

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
    const referenceHook = renderHook(({
      path,
      value
    }) => useIsCycleReference(path, value), {
      wrapper: createWrapper(value),
      initialProps: {
        path: ['b', 'c'] as Path,
        value: ref
      }
    })

    expect(referenceHook.result.current).toBe('b')
  })
})
