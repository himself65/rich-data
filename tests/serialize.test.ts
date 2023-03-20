import { describe, expect, test } from 'vitest'

import { cleanStringify } from '../src/hooks/useCopyToClipboard'
import { predefined } from '../src/stores/typeRegistry'

describe('serialize', () => {
  test('number', () => {
    expect(cleanStringify(1)).toBe('1')
    expect(cleanStringify(114514)).toBe('114514')
  })

  test('string', () => {
    expect(cleanStringify('1')).toBe('"1"')
    expect(cleanStringify('114514')).toBe('"114514"')
  })

  test('boolean', () => {
    expect(cleanStringify(true)).toBe('true')
    expect(cleanStringify(false)).toBe('false')
  })

  test('null', () => {
    expect(cleanStringify(null)).toBe('null')
  })

  test('predefined', () => {
    const types = predefined()
    const numberType = types.find(type => type.is(1, []))
    expect(numberType).to.toBeDefined()
    expect(numberType.serialize(1)).toBe('1')

    const stringType = types.find(type => type.is('1', []))
    expect(stringType).toBeDefined()
    expect(stringType.serialize('1')).toBe('"1"')

    const booleanType = types.find(type => type.is(true, []))
    expect(booleanType).toBeDefined()
    expect(booleanType.serialize(true)).toBe('true')

    const nullType = types.find(type => type.is(null, []))
    expect(nullType).toBeDefined()
    expect(nullType.serialize(null)).toBe('null')
  })
})
