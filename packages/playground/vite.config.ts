import { resolve } from 'node:path'

import react from "@vitejs/plugin-react-swc";
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
  }
})
