import { internalThemeAtom } from '../atom'
import type { Plugin, Store } from '../vanilla'

export const enum ThemeMode {
  Dark = 'dark',
  Light = 'light'
}

export interface Theme {
  mode: ThemeMode
}

type ThemePluginMiddleware<C, A> = {
  setTheme: (mode: ThemeMode) => void
  getTheme (): Theme
}

declare module '../vanilla' {
  interface ContextMutators<C, A> {
    'rich-data/theme': ThemePluginMiddleware<C, A>
  }
}

export const ThemePlugin = (
  config?: {
    defaultMode?: ThemeMode,
  }
) => ({
  id: 'rich-data/theme',
  middleware: (
    store: Store
  ) => {
    store.set(internalThemeAtom, {
      mode: config?.defaultMode ?? ThemeMode.Light
    })
    return {
      setTheme: (mode: ThemeMode) => {
        store.set(internalThemeAtom, theme => ({ ...theme, mode }))
        console.log('theme', store.get(internalThemeAtom))
      },
      getTheme (): Theme {
        return store.get(internalThemeAtom)
      }
    }
  }
} satisfies Plugin)
