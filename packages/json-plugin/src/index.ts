import { BooleanBlockPlugin } from './blocks/boolean-block'
import { NilBlockPlugin } from './blocks/nil-block'
import { NumberBlockPlugin } from './blocks/number-block'
import { StringBlockPlugin } from './blocks/string-block'

export function createJsonPlugins () {
  return [
    BooleanBlockPlugin,
    NilBlockPlugin,
    NumberBlockPlugin,
    StringBlockPlugin
  ] as const
}
