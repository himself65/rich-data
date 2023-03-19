
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './tests/setup.ts',
    globals: true,
    environment: 'jsdom',
    testTimeout: 5000,
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
      reportsDirectory: '.coverage/viewer'
    },
    exclude: ['e2e', 'node_modules']
  }
})
