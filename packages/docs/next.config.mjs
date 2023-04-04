import nextra from 'nextra'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.jsx',
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblock: false
  }
})

export default withVanillaExtract(withNextra({
  reactStrictMode: true,
  transpilePackages: [
    '@rich-data/viewer',
    '@rich-data/json-plugins'
  ],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx']
    }
  }
}))
