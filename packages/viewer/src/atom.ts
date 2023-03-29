/**
 * @internal atoms are not exported from the package, please use the hooks instead
 */
import { atom } from 'jotai'
import type { FC } from 'react'

import type { Theme } from './middleware/theme.js'
import { ThemeMode } from './middleware/theme.js'
import type { Block, Context, Middleware, ViewerProps } from './vanilla.js'

export const internalRootValueAtom = atom<unknown>(null as unknown)
export const internalBlocksAtom = atom<Block[]>([])
export const internalMiddlewareAtom = atom<(Middleware | Promise<Middleware>)[]>([])
export const internalMiddlewarePromiseAtom = atom<Promise<Middleware[]>>(async (get) => {
  const middlewares = get(internalMiddlewareAtom)
  return Promise.all(middlewares)
})
export const internalViewerAtom = atom<FC<ViewerProps>>(null as unknown as FC<ViewerProps>)
export const internalElementAtom = atom<HTMLElement | null>(null as unknown as HTMLElement)
export const internalThemeAtom = atom<Theme>({
  mode: ThemeMode.Light
})
export const internalContextAtom = atom<Context>(null as unknown as Context)
