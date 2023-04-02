import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config: Pick<StorybookConfig, 'viteFinal'> = {
  async viteFinal (config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        react()
      ]
    })
  }
}

export default config
