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

export type Context = {}

type UnRegisterCallback = () => void

export type Plugin<Flavour extends keyof FlavourRegistry = keyof FlavourRegistry> = {
  flavour: Flavour
  typeRenderer: TypeRenderer<Flavour>
}

export type ViewerProps<Value = unknown> = {
  value: Value
}

export type Store = ReturnType<typeof createStore>

export function createContext (store: Store): Context {
  return {}
}
