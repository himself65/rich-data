import {
  internalElementAtom,
  internalThemeAtom
} from '../atom.js'
import type { Plugin, Store } from '../vanilla.js'

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

declare module '../vanilla.js' {
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
      const darkThemeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)')
      const element = store.get(internalElementAtom)
      console.assert(element != null, 'element should not be null')
      if (element) {
        element.setAttribute('data-theme',
          darkThemeMediaQuery.matches ? ThemeMode.Dark : ThemeMode.Light)
      }
      if (darkThemeMediaQuery.matches) {
        store.set(internalThemeAtom, theme => ({
          ...theme,
          mode: ThemeMode.Dark
        }))
      } else {
        store.set(internalThemeAtom, theme => ({
          ...theme,
          mode: ThemeMode.Light
        }))
      }
      const callback = (e: MediaQueryListEvent) => {
        const element = store.get(internalElementAtom)
        console.assert(element != null, 'element should not be null')
        if (element) {
          element.setAttribute('data-theme',
            darkThemeMediaQuery.matches ? ThemeMode.Dark : ThemeMode.Light)
        }
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
        const element = store.get(internalElementAtom)
        if (element) {
          element.setAttribute('data-theme', mode)
        }
        store.set(internalThemeAtom, theme => ({ ...theme, mode }))
      },
      getTheme (): Theme {
        return store.get(internalThemeAtom)
      }
    }
  }
} satisfies Plugin)
