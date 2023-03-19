import '@rich-data/viewer/theme/base.css'

import type { JsonViewerKeyRenderer } from '@rich-data/viewer'
import { JsonViewer } from '@rich-data/viewer'
import { createRoot } from 'react-dom/client'

// this url is copied from: https://beta.reactjs.org/learn/passing-props-to-a-component
const avatar = 'https://i.imgur.com/1bX5QH6.jpg'

function aPlusB (a: number, b: number) {
  return a + b
}
const aPlusBConst = function (a: number, b: number) {
  return a + b
}

const loopObject = {
  foo: 1,
  goo: 'string'
} as Record<string, any>

loopObject.self = loopObject

const loopArray = [
  loopObject
]

loopArray[1] = loopArray

const longArray = Array.from({ length: 1000 }).map((_, i) => i)
const map = new Map<any, any>()
map.set('foo', 1)
map.set('goo', 'hello')
map.set({}, 'world')

const set = new Set([1, 2, 3])

const superLongString = '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'

const value = {
  loopObject,
  loopArray,
  longArray,
  string: 'this is a string',
  integer: 42,
  array: [19, 19, 810, 'test', NaN],
  emptyArray: [],
  nestedArray: [
    [1, 2],
    [3, 4]
  ],
  map,
  emptyMap: new Map(),
  set,
  emptySet: new Set(),
  float: 114.514,
  undefined,
  superLongString,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null
  },
  emptyObject: {},
  function: aPlusB,
  constFunction: aPlusBConst,
  anonymousFunction: function (a: number, b: number) {
    return a + b
  },
  shortFunction: (arg1: any, arg2: any) => console.log(arg1, arg2),
  shortLongFunction: (arg1: any, arg2: any) => {
    console.log(arg1, arg2)
    return '123'
  },
  string_number: '1234',
  timer: 0,
  avatar,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  bigint: 123456789087654321n
}

const KeyRenderer: JsonViewerKeyRenderer = ({ path }) => {
  return <del aria-label='I dont like this number'>&quot;{path.slice(
    -1)}&quot;</del>
}
KeyRenderer.when = (props) => props.value === 114.514

createRoot(document.getElementById('app')).render(
  <div>
    <h1>Playground</h1>
    <div className='container'>
      <JsonViewer value={value}/>
    </div>
  </div>
)
