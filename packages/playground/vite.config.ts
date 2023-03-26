import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
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
      '@rich-data/viewer': resolve(
        fileURLToPath(new URL('../viewer', import.meta.url))
      )
    }
  }
})
