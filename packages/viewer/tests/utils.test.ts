import { cleanStringify } from '@rich-data/viewer/utils'
import { describe, expect, test } from 'vitest'

describe('utils', () => {
  test('cleanStringify', () => {
    expect(cleanStringify({})).toEqual('{}')
    expect(cleanStringify({ a: 1 })).toEqual('{"a":1}')
    expect(cleanStringify({ a: 1, b: 2 })).toEqual('{"a":1,"b":2}')
    expect(cleanStringify({ a: 1, b: 2, c: 3 })).toEqual('{"a":1,"b":2,"c":3}')
    expect(cleanStringify({ a: 1, b: 2, c: 3, d: 4 })).toEqual('{"a":1,"b":2,"c":3,"d":4}')

    const recursive: {
      a: number
      b?: unknown
    } = { a: 1 }
    recursive.b = recursive
    expect(cleanStringify(recursive)).toEqual('{"a":1,"b":"[Circular]"}')
  })
})
