import type { JsonViewerProps } from '@rich-data/viewer'
import type { PropsWithChildren } from 'react'

import {
  createJsonViewerStore,
  JsonViewerProvider
} from '../../src/stores/JsonViewerStore'

export function createWrapper <T> (value: T, props?: Omit<JsonViewerProps<T>, 'value'>) {
  const store = createJsonViewerStore<T>({
    ...props,
    value
  })
  return ({ children }: PropsWithChildren) =>
    <JsonViewerProvider value={store}>
      {children}
    </JsonViewerProvider>
}
