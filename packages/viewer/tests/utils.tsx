import type { Narrow, Plugin } from '@rich-data/viewer'
import { createViewerHook } from '@rich-data/viewer'
import { internalRootValueAtom } from '@rich-data/viewer/atom'
import type { ReactNode } from 'react'

export function createEmptyContext<
  Plugins extends readonly Plugin[],
  Value = unknown,
> (rootValue: Value, plugins?: Plugins) {
  const hooks = createViewerHook<Plugins>({
    plugins: (plugins ?? []) as Narrow<Plugins>
  })
  const { Provider } = hooks
  const store = hooks.createStore()
  store.set(internalRootValueAtom, rootValue)

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      {children}
    </Provider>
  )

  return {
    Wrapper,
    Viewer: hooks.Viewer,
    useContext: hooks.useContext
  } as const
}
