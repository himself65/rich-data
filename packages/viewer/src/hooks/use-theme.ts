import { useAtomValue } from 'jotai'

import { internalThemeAtom } from '../atom'

export function useTheme () {
  return useAtomValue(internalThemeAtom)
}
