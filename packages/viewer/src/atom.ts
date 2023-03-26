import { atom } from 'jotai'
import type { FC } from 'react'

import type { Theme } from './middleware/theme'
import { ThemeMode } from './middleware/theme'
import type { Block, Context, ViewerProps } from './vanilla'

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
export const internalThemeAtom = atom<Theme>({
  mode: ThemeMode.Light
})

/**
 * @internal
 */
export const internalContextAtom = atom<Context>(null as unknown as Context)
