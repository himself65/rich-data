import { createStore } from 'jotai'
import {
  ComponentType
} from 'react'
import { typeRenderersAtom } from './atom'

export interface FlavourRegistry {
  // [flavour]: Value
}

export interface DataValueProps<ValueType = unknown> {
  value: ValueType
}

export type TypeRenderer<Flavour extends keyof FlavourRegistry = keyof FlavourRegistry> = {
  flavour: Flavour
  is: (value: unknown) => boolean
  Component: ComponentType<DataValueProps<FlavourRegistry[Flavour]>>
}

export type Context = {
  addDataTypeRenderer: <Flavour extends keyof FlavourRegistry>(renderer: TypeRenderer<Flavour>) => void
  removeDataTypeRenderer: (flavour: keyof FlavourRegistry) => void
}

type UnRegisterCallback = () => void

export type Plugin = {
  register: (context: Context) => UnRegisterCallback
}

export type ViewerProps<Value = unknown> = {
  value: Value
}

export type Store = ReturnType<typeof createStore>

export function createContext() {
  const store = createStore()
  return {
    addDataTypeRenderer: (renderer: TypeRenderer) => {
      store.set(typeRenderersAtom, (prev) => [...prev, renderer])
    },
    removeDataTypeRenderer: (flavour: keyof FlavourRegistry) => {
      store.set(typeRenderersAtom,
        (prev) => prev.filter((renderer) => renderer.flavour !== flavour)
      )
    }
  }
}
