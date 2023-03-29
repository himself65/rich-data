import { useAtomValue } from 'jotai'

import { internalContextAtom } from '../atom.js'

export function useContext() {
  return useAtomValue(internalContextAtom)
}
