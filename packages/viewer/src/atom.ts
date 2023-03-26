import { atom } from 'jotai'
import type { FC } from 'react'

import type { Context, TypeRenderer, ViewerProps } from './vanilla'

export const typeRenderersAtom = atom<TypeRenderer[]>([])

export const viewerAtom = atom<FC<ViewerProps> | null>(null)

export const contextAtom = atom<Context | null>(null)
