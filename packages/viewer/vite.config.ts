import { resolve } from 'node:path'

import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  esbuild: {
    minifySyntax: false
  },
  build: {
    terserOptions: {
      ecma: 2020
    },
    minify: false,
    lib: {
      entry: {
        index: resolve(root, 'src/index.ts'),
        vanilla: resolve(root, 'src/vanilla.ts'),
        react: resolve(root, 'src/react.tsx'),
        'blocks/boolean-block': resolve(root, 'src/blocks/boolean-block.tsx'),
        'blocks/nil-block': resolve(root, 'src/blocks/nil-block.tsx'),
        'blocks/number-block': resolve(root, 'src/blocks/number-block.tsx'),
        'blocks/string-block': resolve(root, 'src/blocks/string-block.tsx'),
        'components/metadata': resolve(root, 'src/components/metadata.tsx'),
        'hooks/use-path': resolve(root, 'src/hooks/use-path.ts'),
        'hooks/use-theme': resolve(root, 'src/hooks/use-theme.ts'),
        'middleware/theme': resolve(root, 'src/middleware/theme.ts'),
      },
      name: 'RichDataViewer',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'jotai'
      ]
    }
  },
  plugins: [dts({
    insertTypesEntry: true
  })]
})
