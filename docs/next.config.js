const { PerfseePlugin } = require('@perfsee/webpack')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_staticImage: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ['i.imgur.com', 'www.netlify.com']
  },
  transpilePackages: [
    '@rich-data/viewer'
  ],
  experimental: {
    externalDir: true
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      config.devtool = 'hidden-nosources-source-map'
      const perfsee = new PerfseePlugin({
        project: 'affine-toeverything'
      })
      if (Array.isArray(config.plugins)) {
        config.plugins.push(perfsee)
      } else {
        config.plugins = [perfsee]
      }
    }
    return config
  }
}

module.exports = withNextra(nextConfig)
