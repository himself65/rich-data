import type { createStore } from 'jotai'
import type { FC } from 'react'

import { internalElementAtom, internalViewerAtom } from './atom.js'
import type { Narrow } from './utils.js'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlockFlavourMap {}

export interface DataValueProps<Value = unknown> {
  value: Value
}

export type Block<Value = unknown, Flavour extends string = string> = {
  flavour: Flavour
  is: (value: unknown) => value is Value
  Component: FC<DataValueProps<Value>>
}

export function defineBlock<Value, Flavour extends string> (
  flavour: Flavour,
  is: (value: unknown) => value is Value,
  Component: Block<Value, Flavour>['Component']
): Block<Value, Flavour> {
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
  cache: {
    [key: string]: {
      expand: boolean
    }
  }
  getViewer: () => FC<ViewerProps>
  getElement: () => Element | null
}

export function createContext (store: Store) {
  return {
    cache: {},
    getViewer: () => {
      const Viewer = store.get(internalViewerAtom)
      if (!Viewer) {
        throw new Error('no viewer found')
      }
      return Viewer
    },
    getElement: (): Element | null => {
      return store.get(internalElementAtom)
    },
  } satisfies Context
}

export interface Middleware<
  Id extends ContextMutatorIdentifier = ContextMutatorIdentifier
> {
  id: Id
  effect: (store: Store) => () => void

  middleware (store: Store): ContextMutators<Context, unknown>[Id]
}

export function defineMiddleware<T extends Middleware> (middleware: Narrow<T>): Narrow<T> {
  return middleware
}

// I think we cannot remove any here forever.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin = Block<any> | Middleware | Promise<Middleware>

export type ViewerProps<Value = unknown> = {
  value: Value
}

export type Store = ReturnType<typeof createStore>

export {
  Narrow
}
