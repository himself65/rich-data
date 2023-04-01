import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import istanbul from 'vite-plugin-istanbul'
import defineConfig from '@rich-data/scripts/vitest.config'

const config: Pick<StorybookConfig, 'viteFinal'> = {
  async viteFinal (config, { configType }) {
    return mergeConfig(config, mergeConfig(defineConfig(), {
        plugins: [
          istanbul({
            include: ['src/*'],
            exclude: ['node_modules', 'test', 'stories'],
            extension: ['.ts', '.tsx'],
            forceBuildInstrument: process.env.COVERAGE === 'true'
          })
        ],
        resolve: {
          alias: {
            'react/jsx-runtime': 'react/jsx-runtime.js',
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
            '@rich-data/viewer': resolve(
              fileURLToPath(new URL('../../viewer', import.meta.url))
            )
          }
        }
      })
    )
  }
}

export default config
