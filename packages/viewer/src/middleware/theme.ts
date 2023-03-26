import { atom, useAtomValue } from 'jotai'

import type { Plugin, Store } from '../vanilla'

export interface Theme {
  mode: 'dark' | 'light'
}

declare module '../vanilla' {
  interface Context {
    setTheme: (mode: 'light' | 'dark') => void
    useTheme (): Theme
    getTheme (): Theme
  }
}

const themeAtom = atom<Theme>({
  mode: 'light'
})

export const ThemePlugin: Plugin = {
  middleware: (
    store: Store
  ) => {
    return {
      useTheme: (): Theme => {
        return useAtomValue(themeAtom)
      },
      setTheme: (mode: 'light' | 'dark') => {
        store.set(themeAtom, theme => ({ ...theme, mode }))
        console.log('theme', store.get(themeAtom))
      },
      getTheme (): Theme {
        return store.get(themeAtom)
      }
    }
  }
}
