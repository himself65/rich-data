import { atom } from 'jotai'
import type { FC } from 'react'

import type { Context, TypeRenderer, ViewerProps } from './vanilla'

export const typeRenderersAtom = atom<TypeRenderer[]>([])

export const viewerAtom = atom<FC<ViewerProps>>(null as FC<ViewerProps>)

export const contextAtom = atom<Context>({
  getViewer: () => {
    throw new Error('No viewer registered')
  }
})
