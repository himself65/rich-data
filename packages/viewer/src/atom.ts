import { atom } from 'jotai'

import type { TypeRenderer } from './vanilla'

export const typeRenderersAtom = atom<TypeRenderer[]>([])
