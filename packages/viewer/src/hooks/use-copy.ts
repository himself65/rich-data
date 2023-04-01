import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

import { internalCopyCallbackAtom } from '../atom.js'

export function useCopy() {
  const callback = useAtomValue(internalCopyCallbackAtom)
  return useCallback(async (value: unknown) => {
    const output = callback(value)
    if (output) {
      await navigator.clipboard.write(output)
    }
  }, [callback])
}
