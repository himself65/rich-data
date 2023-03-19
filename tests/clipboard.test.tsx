import type { Path } from '@rich-data/viewer'
import { act, renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { useClipboard } from '../src/hooks/useCopyToClipboard'
import { createWrapper } from './utils'

let clipboardContent: string | null = null
beforeAll(() => {
  window.prompt = vi.fn()
  Object.assign(navigator, {
    clipboard: {
      writeText: async (text: string) => { clipboardContent = text }
    }
  })
})

describe('clipboard', () => {
  it('should reset copied', async () => {
    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(1)
    })
    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      await clipboardHook.result.current.copy([], 1)
    })
    expect(clipboardHook.result.current.copied).toBe(true)
    act(() => {
      clipboardHook.result.current.reset()
    })
    expect(clipboardHook.result.current.copied).toBe(false)
  })

  it('should copy success for circular object', async () => {
    const value = {
      a: 1,
      b: undefined
    }
    value.b = value
    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value)
    })
    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      await clipboardHook.result.current.copy([], value)
    })
    expect(clipboardHook.result.current.copied).toBe(true)
    expect(clipboardContent).toBe('{"a":1,"b":"###_Circular_###"}')
  })

  it('should copy success for object', async () => {
    const value = {
      a: 1
    }
    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value)
    })

    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      await clipboardHook.result.current.copy([], value)
    })
    expect(clipboardHook.result.current.copied).toBe(true)

    expect(clipboardContent).toBe('{"a":1}')
  })

  it('should copy success for custom onCopy', async () => {
    const value = {
      a: 1
    }

    const fn = vi.fn((path: Path, actual: unknown) => {
      expect(path).toEqual(['a'])
      expect(actual).toBe(value.a)
    })

    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value, {
        onCopy: fn
      })
    })

    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      await clipboardHook.result.current.copy(['a'], value.a)
    })
    expect(clipboardHook.result.current.copied).toBe(true)

    expect(fn).toBeCalledTimes(1)
  })

  it('should copy success for custom async onCopy', async () => {
    const value = {
      a: 1
    }

    const fn = vi.fn(async (path: Path, actual: unknown) => {
      expect(path).toEqual(['a'])
      expect(actual).toBe(value.a)
    })

    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value, {
        onCopy: fn
      })
    })

    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      await clipboardHook.result.current.copy(['a'], value.a)
    })
    expect(clipboardHook.result.current.copied).toBe(true)

    expect(fn).toBeCalledTimes(1)
  })

  it('should copy success for custom onCopy error', async () => {
    const value = {
      a: 1
    }

    const fn = vi.fn(() => {
      throw new Error()
    })

    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value, {
        onCopy: fn
      })
    })

    expect(clipboardHook.result.current.copied).toBe(false)
    act(() => {
      const fn = vi.fn((...args: unknown[]) => {
        expect(args[0]).toBe('error when copy src[a]')
      })
      vi.stubGlobal('console', {
        error: fn
      })
      clipboardHook.result.current.copy(['a'], value.a)
      expect(fn).toBeCalledTimes(1)
    })
    expect(clipboardHook.result.current.copied).toBe(false)

    expect(fn).toBeCalledTimes(1)
  })

  it('should copy success for custom async onCopy error', async () => {
    const value = {
      a: 1
    }

    const fn = vi.fn(async () => {
      throw new Error()
    })

    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: createWrapper(value, {
        onCopy: fn
      })
    })

    expect(clipboardHook.result.current.copied).toBe(false)
    await act(async () => {
      const fn = vi.fn((...args: unknown[]) => {
        expect(args[0]).toBe('error when copy src[a]')
      })
      vi.stubGlobal('console', {
        error: fn
      })
      await clipboardHook.result.current.copy(['a'], value.a)
      expect(fn).toBeCalledTimes(1)
    })
    expect(clipboardHook.result.current.copied).toBe(false)

    expect(fn).toBeCalledTimes(1)
  })
})
