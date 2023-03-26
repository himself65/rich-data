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
    preferSystem?: boolean
  }
) => ({
  id: 'rich-data/theme',
  effect: (store) => {
    const preferSystem = config?.preferSystem ?? true
    if (preferSystem) {
      const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMediaQuery.matches) {
        store.set(internalThemeAtom, theme => ({
          ...theme,
          mode: ThemeMode.Dark
        }))
        console.log('theme', store.get(internalThemeAtom))
      } else {
        store.set(internalThemeAtom, theme => ({
          ...theme,
          mode: ThemeMode.Light
        }))
      }
      const callback = (e: MediaQueryListEvent) => {
        store.set(internalThemeAtom, theme => ({
          ...theme,
          mode: e.matches ? ThemeMode.Dark : ThemeMode.Light
        }))
      }
      darkThemeMediaQuery.addEventListener('change', callback)
      return () => {
        darkThemeMediaQuery.removeEventListener('change', callback)
      }
    }
    return () => void 0
  },
  middleware: (
    store: Store
  ) => {
    store.set(internalThemeAtom, theme => ({
      ...theme,
      mode: config?.defaultMode ?? ThemeMode.Light
    }))
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
