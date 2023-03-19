import path, { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import istanbul from 'vite-plugin-istanbul'

const enableIstanbul = !!process.env.CI || !!process.env.COVERAGE

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    enableIstanbul &&
      istanbul({
        cwd: fileURLToPath(new URL('..', import.meta.url)),
        include: ['src/**/*'],
        exclude: ['node_modules', 'tests', 'e2e'],
        forceBuildInstrument: true
      })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@rich-data/viewer': path.resolve(
        fileURLToPath(new URL('..', import.meta.url))
      )
    }
  }
})
