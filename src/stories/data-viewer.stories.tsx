import { expect } from '@storybook/jest'
// Button.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { JsonViewer } from '..'

const meta: Meta<typeof JsonViewer> = {
  title: 'Example/JsonViewer',
  component: JsonViewer
}

export default meta

type Story = StoryObj<typeof JsonViewer>;

export const Simple: Story = {
  render: () => <JsonViewer value={{ foo: 'bar' }} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = canvas.getByTestId('data-key-pair')
    expect(root.querySelector('[data-testid="data-key-pairfoo"]')).toBeDefined()
    await userEvent.click(root.querySelector('[data-testid="expand-more-icon"]'))
    expect(root.querySelector('[data-testid="data-key-pairfoo"]')).toBeNull()
    await userEvent.click(root.querySelector('[data-testid="chevron-right-icon"]'))
    expect(root.querySelector('[data-testid="data-key-pairfoo"]')).toBeDefined()
  }
}

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

export const Heavy: Story = {
  render: () => <JsonViewer value={value} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = canvas.getByTestId('data-key-pair')
    expect(root.querySelector('[data-testid="data-key-pairlongArray"]')).toBeDefined()
    await userEvent.click(root.querySelector('[data-testid="expand-more-icon"]'))
    expect(root.querySelector('[data-testid="data-key-pairlongArray"]')).toBeNull()
    await userEvent.click(root.querySelector('[data-testid="chevron-right-icon"]'))
    expect(root.querySelector('[data-testid="data-key-pairlongArray"]')).toBeDefined()
  }
}
