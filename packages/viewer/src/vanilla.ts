import type { createStore } from 'jotai'
import type {
  ComponentType
} from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

// eslint-disable-next-line @typescript-eslint/ban-types
export type Context = {}

export type Plugin<Flavour extends keyof FlavourRegistry = keyof FlavourRegistry> = {
  flavour: Flavour
  typeRenderer: TypeRenderer<Flavour>
}

export type ViewerProps<Value = unknown> = {
  value: Value
}

export type Store = ReturnType<typeof createStore>

export function createContext (_store: Store): Context {
  return {}
}
