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
  }
}

module.exports = withNextra(nextConfig)
