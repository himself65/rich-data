import { resolve } from 'node:path'

import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        ["@swc-jotai/react-refresh", {}],
        ["@swc-jotai/debug-label", {}]
      ]
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
      '@rich-data/viewer': resolve(
        fileURLToPath(new URL('../viewer/src', import.meta.url))
      ),
      '@rich-data/viewer/*': resolve(
        fileURLToPath(new URL('../viewer/src/*', import.meta.url))
      )
    }
  }
})
