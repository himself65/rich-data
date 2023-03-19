import { useMemo } from 'react'

import { useJsonViewerStore } from '../stores/JsonViewerStore'
import type { Path } from '../type'
import { isCycleReference } from '../utils'

export function useIsCycleReference (path: Path, value: any) {
  const rootValue = useJsonViewerStore(store => store.value)
  return useMemo(
    () => isCycleReference(rootValue, path, value),
    [path, value, rootValue])
}
