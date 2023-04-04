import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true
    }
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()]
    })
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
} satisfies StorybookConfig;
