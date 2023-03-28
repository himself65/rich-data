import { atom } from 'jotai'
import type { FC } from 'react'

import type { Theme } from './middleware/theme.js'
import { ThemeMode } from './middleware/theme.js'
import type { Block, Context, ViewerProps } from './vanilla.js'

/**
 * @internal
 */
export const internalRootValueAtom = atom<unknown>(null as unknown)

/**
 * @internal
 */
export const internalBlocksAtom = atom<Block[]>([])

/**
 * @internal
 */
export const internalViewerAtom = atom<FC<ViewerProps>>(null as unknown as FC<ViewerProps>)

/**
 * @internal
 */
export const internalElementAtom = atom<HTMLElement | null>(null)

/**
 * @internal
 */
export const internalThemeAtom = atom<Theme>({
  mode: ThemeMode.Light
})

/**
 * @internal
 */
export const internalContextAtom = atom<Context>(null as unknown as Context)
