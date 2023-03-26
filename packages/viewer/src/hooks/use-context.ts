import { useAtomValue } from 'jotai'

import { contextAtom } from '../atom'
import type { Context } from '../vanilla'

export function useContext(): Context {
  const context = useAtomValue(contextAtom)
  if (!context) {
    throw new Error('Context is not set')
  }
  return context
}
