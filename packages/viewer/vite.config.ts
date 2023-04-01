import { resolve } from 'node:path'

import config from '@rich-data/scripts/vitest.config'
import { fileURLToPath } from 'url'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default mergeConfig(defineConfig({
  esbuild: {
    minifySyntax: true
  },
  build: {
    terserOptions: {
      ecma: 2020
    },
    minify: 'esbuild',
    lib: {
      entry: {
        index: resolve(root, 'src/index.ts'),
        vanilla: resolve(root, 'src/vanilla.ts'),
        react: resolve(root, 'src/react.tsx'),
        'components/metadata': resolve(root, 'src/components/metadata.tsx'),
        'components/tag': resolve(root, 'src/components/tag.tsx'),
        'components/colon': resolve(root, 'src/components/colon.tsx'),
        'hooks/use-cached-boolean-state': resolve(root,
          'src/hooks/use-cached-boolean-state.ts'),
        'hooks/use-context': resolve(root, 'src/hooks/use-context.ts'),
        'hooks/use-path': resolve(root, 'src/hooks/use-path.ts'),
        'hooks/use-theme': resolve(root, 'src/hooks/use-theme.ts'),
        'middleware/theme': resolve(root, 'src/middleware/theme.ts')
      },
      name: 'RichDataViewer'
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
  plugins: [
    dts({
      insertTypesEntry: true
    })]
}), config)
