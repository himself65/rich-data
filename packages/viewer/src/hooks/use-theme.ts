import { useAtomValue } from 'jotai'

import { internalThemeAtom } from '../atom.js'

export function useTheme () {
  return useAtomValue(internalThemeAtom)
}
