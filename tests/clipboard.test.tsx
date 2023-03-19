import type { JsonViewerProps } from '@rich-data/viewer'
import { act, renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { useClipboard } from '../src/hooks/useCopyToClipboard'
import {
  createJsonViewerStore,
  JsonViewerProvider
} from '../src/stores/JsonViewerStore'

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
  it('should copy success for circular object', async () => {
    const value = {
      a: 1,
      b: undefined
    }
    value.b = value
    const store = createJsonViewerStore({ value } satisfies JsonViewerProps<any>)
    const clipboardHook = renderHook(() => useClipboard(), {
      wrapper: ({ children }) =>
        <JsonViewerProvider value={store}>
          {children}
        </JsonViewerProvider>
    })
    await act(async () => {
      await clipboardHook.result.current.copy([], value)
    })
    expect(clipboardContent).toBe('{"a":1,"b":"###_Circular_###"}')
  })
})
