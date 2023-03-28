import { ArrayBlockPlugin } from './blocks/array-block.js'
import { BooleanBlockPlugin } from './blocks/boolean-block.js'
import { NilBlockPlugin } from './blocks/nil-block.js'
import { NumberBlockPlugin } from './blocks/number-block.js'
import { ObjectBlockPlugin } from './blocks/object-block.js'
import { StringBlockPlugin } from './blocks/string-block.js'

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
