import { expect } from '@playwright/test'

import { test } from './lib/playwright'

test('click to hide', async ({ page }) => {
  await page.goto('http://localhost:4000')
  const root = await page.getByTestId('data-key-pair')
  const longArray = page.getByTestId('data-key-pairlongArray')
  expect(await longArray.nth(0).isVisible()).toBe(true)
  await root.click({
    position: {
      x: 1,
      y: 1
    }
  })
  expect(await longArray.nth(0).isVisible()).toBe(false)
})
