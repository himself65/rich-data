import { atom } from 'jotai'
import type { FC } from 'react'

import type { Block, ViewerProps } from './vanilla'

export const typeRenderersAtom = atom<Block[]>([])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const viewerAtom = atom<FC<ViewerProps>>(null! as FC<ViewerProps>)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const contextAtom = atom<any>(null)
