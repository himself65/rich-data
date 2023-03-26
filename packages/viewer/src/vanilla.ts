import type { createStore } from 'jotai'
import type { FC } from 'react'

import { viewerAtom } from './atom'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlavourRegistry {
  // [flavour]: Value
}

export interface DataValueProps<Value = unknown> {
  value: Value
}

// fixme: remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Block<Flavour extends string = any> = {
  flavour: Flavour
  is: (value: unknown) => boolean
  Component:
    Flavour extends keyof FlavourRegistry
      ? FC<DataValueProps<FlavourRegistry[Flavour]>>
      : FC<DataValueProps>
}

export function defineBlock<Flavour extends string> (
  flavour: Flavour,
  is: (value: unknown) => boolean,
  Component: Block<Flavour>['Component']
): Block<Flavour> {
  return {
    flavour,
    is,
    Component
  }
}

export type Write<T, U> = Omit<T, keyof U> & U

export type Mutate<C, Cm> = number extends Cm['length' & keyof Cm]
  ? C
  : Cm extends []
    ? C
    : Cm extends [[infer Id, infer Ca], ...infer Rest]
      ? Mutate<Write<C, ContextMutators<C, Ca>[Id & ContextMutatorIdentifier]>, Rest>
      : never

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContextMutators<C, A> {}

export type ContextMutatorIdentifier = keyof ContextMutators<unknown, unknown>

export interface Context {
  getViewer: () => FC<ViewerProps>
}

export function createContext (store: Store) {
  return {
    getViewer: () => {
      const Viewer = store.get(viewerAtom)
      if (!Viewer) {
        throw new Error('no viewer found')
      }
      return Viewer
    }
  } as Context
}

export interface Middleware<
  Id extends ContextMutatorIdentifier = ContextMutatorIdentifier
> {
  id: Id
  middleware(store: Store): ContextMutators<Context, unknown>[Id]
}

export type Plugin = Block | Middleware

export type ViewerProps<Value = unknown> = {
  value: Value
}

export type Store = ReturnType<typeof createStore>
