import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = resolve(fileURLToPath(new URL('.', import.meta.url)))

export default defineConfig({
  plugins: [],
  test: {
    environment: 'happy-dom',
    testTimeout: 5000,
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
      reportsDirectory: '.coverage'
    }
  },
  resolve: {
    alias: {
      '@rich-data/viewer': resolve(__dirname, '../viewer', 'src'),
    }
  }
})
