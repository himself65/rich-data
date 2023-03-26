import { atom } from 'jotai/vanilla/atom'
import type { TypeRenderer } from './vanilla'

export const typeRenderersAtom = atom<TypeRenderer[]>([])
