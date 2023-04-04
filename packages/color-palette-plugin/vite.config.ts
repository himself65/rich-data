import { resolve } from 'node:path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'


const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  esbuild: {
    minifySyntax: true
  },
  build: {
    emptyOutDir: true,
    terserOptions: {
      ecma: 2020
    },
    minify: 'esbuild',
    lib: {
      entry: {
        index: resolve(root, 'src/index.tsx'),
      },
      name: 'RichDataColorPalettePlugin',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'jotai',
        /^@rich-data\/viewer/,
      ]
    }
  },
  plugins: [dts({
    insertTypesEntry: true
  }), vanillaExtractPlugin()]
})
