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
