import { defineMiddleware } from '@rich-data/viewer'
import { usePath } from '@rich-data/viewer/hooks/use-path'
import { renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { createEmptyContext } from './utils.js'
declare module '@rich-data/viewer' {
  interface ContextMutators<C, A> {
    'test': {
      ping: () => string
    }
  }
}

describe('hooks', () => {
  test('use-path', () => {
    const value = {
      a: {
        b: {
          c: {
            d: 1
          }
        },
        foo: 2
      }
    }
    const { Wrapper } = createEmptyContext(value)
    {
      const { result: { current } } = renderHook(() => usePath(value), {
        wrapper: Wrapper
      })
      expect(current).toEqual([])
    }
    {
      const { result: { current } } = renderHook(() => usePath(value.a), {
        wrapper: Wrapper
      })
      expect(current).toEqual(['a'])
    }
    {
      const { result: { current } } = renderHook(() => usePath(value.a.b), {
        wrapper: Wrapper
      })
      expect(current).toEqual(['a', 'b'])
    }
  })

  test('use-context', () => {
    const value = {}
    const { Wrapper, useContext } = createEmptyContext(value, [
      defineMiddleware({
        id: 'test',
        effect: () => () => void 0,
        middleware: () => ({
          ping: () => 'pong'
        })
      })
    ] as const)
    {
      const { result: { current } } = renderHook(() => {
        const context = useContext()
        return context.ping
      }, {
        wrapper: Wrapper
      })
      expect(current()).toEqual('pong')
    }
  })
})
