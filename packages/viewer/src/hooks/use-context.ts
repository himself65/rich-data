import { useAtomValue } from 'jotai'

import { contextAtom } from '../atom'
import type { Context, ContextMutatorIdentifier, Mutate } from '../vanilla'


export function useContext<
  Cms extends [ContextMutatorIdentifier, unknown][] = []
>(): Mutate<Context, Cms> {
  const context = useAtomValue(contextAtom)
  if (!context) {
    throw new Error('Context is not set')
  }
  return context
}
