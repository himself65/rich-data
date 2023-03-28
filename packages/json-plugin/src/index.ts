import { ArrayBlockPlugin } from './blocks/array-block'
import { BooleanBlockPlugin } from './blocks/boolean-block'
import { NilBlockPlugin } from './blocks/nil-block'
import { NumberBlockPlugin } from './blocks/number-block'
import { ObjectBlockPlugin } from './blocks/object-block'
import { StringBlockPlugin } from './blocks/string-block'

export function createJsonPlugins () {
  return [
    BooleanBlockPlugin,
    NilBlockPlugin,
    NumberBlockPlugin,
    StringBlockPlugin,
    ArrayBlockPlugin,
    ObjectBlockPlugin
  ] as const
}
