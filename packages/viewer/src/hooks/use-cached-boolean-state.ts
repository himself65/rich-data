import type { SetStateAction} from 'react';
import { useCallback, useState } from 'react'

import { useContext } from './use-context.js'

export function useCachedBooleanState (key: string, defaultValue: boolean) {
  const context = useContext()
  const [state, set] = useState(context.cache[key]?.expand ?? defaultValue)
  return [
    state,
    useCallback((dispatch: SetStateAction<boolean>) => {
      context.cache[key] = {
        ...context.cache[key],
        expand: typeof dispatch === 'function' ? dispatch(state) : dispatch
      }
      set(dispatch)
    }, [context.cache, key, state])
  ] as const
}
