// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { JsonViewer } from '..'

const meta: Meta<typeof JsonViewer> = {
  title: 'Example/JsonViewer',
  component: JsonViewer
}

export default meta

type Story = StoryObj<typeof JsonViewer>;

export const Simple: Story = {
  render: () => <JsonViewer value={{ foo: 'bar' }} />
}
