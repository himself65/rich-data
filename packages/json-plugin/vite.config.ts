import { resolve } from 'node:path'

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
        index: resolve(root, 'src/index.ts'),
        'blocks/array-block': resolve(root, 'src/blocks/array-block.tsx'),
        'blocks/boolean-block': resolve(root, 'src/blocks/boolean-block.tsx'),
        'blocks/number-block': resolve(root, 'src/blocks/number-block.tsx'),
        'blocks/object-block': resolve(root, 'src/blocks/object-block.tsx'),
        'blocks/string-block': resolve(root, 'src/blocks/string-block.tsx'),
        'blocks/nil-block': resolve(root, 'src/blocks/nil-block.tsx'),
      },
      name: 'RichDataJsonPlugin',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'jotai',
        /^@rich-data\/viewer/,
        /^@tabler\/icons/
      ]
    }
  },
  plugins: [dts({
    insertTypesEntry: true
  })]
})
