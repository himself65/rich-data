import { atom, useAtomValue } from 'jotai'

import type { Plugin, Store } from '../vanilla'

export interface Theme {
  mode: 'dark' | 'light'
}

type ThemePluginMiddleware<C, A> = {
  setTheme: (mode: 'light' | 'dark') => void
  useTheme (): Theme
  getTheme (): Theme
}

declare module '../vanilla' {
  interface ContextMutators<C, A> {
    ['rich-data/theme']: ThemePluginMiddleware<C, A>
  }
}

const themeAtom = atom<Theme>({
  mode: 'light'
})

export const ThemePlugin = {
  id: 'rich-data/theme',
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
} satisfies Plugin
