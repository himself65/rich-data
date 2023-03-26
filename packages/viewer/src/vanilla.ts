import type { createStore } from 'jotai'
import type { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlavourRegistry {
  // [flavour]: Value
}

export interface DataValueProps<Value = unknown> {
  value: Value
}

export type TypeRenderer<Flavour extends string = string> = {
  flavour: Flavour
  is: (value: unknown) => boolean
  Component:
    Flavour extends keyof FlavourRegistry
      ? FC<DataValueProps<FlavourRegistry[Flavour]>>
      : FC<DataValueProps>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Context = {}

export type Plugin<Flavour extends string> = {
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
