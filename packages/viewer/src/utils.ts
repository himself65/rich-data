type Cast<A, B> = A extends B ? A : B;

type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type Narrow<T> = Cast<T, unknown[] | [] | (T extends Primitive ? T : never) | ({
  [K in keyof T]: Narrow<T[K]>
})>;

export function defaultHandleCopy(value: unknown): ClipboardItem[] {
  if (typeof value === 'string') {
    return [new ClipboardItem({ 'text/plain': new Blob([value], { type: 'text/plain' }) })]
  } else if (typeof value === 'object' && value !== null) {
    return [new ClipboardItem({ 'application/json': new Blob([cleanStringify(value)], { type: 'application/json' }) })]
  } else if (typeof value === 'number') {
    return [new ClipboardItem({ 'text/plain': new Blob([`${value}`], { type: 'text/plain' }) })]
  } else if (typeof value === 'boolean') {
    return [new ClipboardItem({ 'text/plain': new Blob([`${value}`], { type: 'text/plain' }) })]
  } else if (value === null) {
    return [new ClipboardItem({ 'text/plain': new Blob(['null'], { type: 'text/plain' }) })]
  }
  return []
}

export function cleanStringify (object: object): string {
  function copyWithoutCircularReferences (references: object[], object: object) {
    const cleanObject: Record<string, unknown> = {}
    Object.keys(object).forEach(function (key) {
      const value = object[key as keyof typeof object]
      if (value && typeof value === 'object') {
        if (references.indexOf(value) < 0) {
          references.push(value)
          cleanObject[key] = copyWithoutCircularReferences(references, value)
          references.pop()
        } else {
          cleanObject[key] = '[Circular]'
        }
      } else if (typeof value !== 'function') {
        cleanObject[key] = value
      }
    })
    return cleanObject
  }
  if (object && typeof object === 'object') {
    object = copyWithoutCircularReferences([object], object)
  }
  return JSON.stringify(object)
}
