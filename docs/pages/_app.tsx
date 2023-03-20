import 'nextra-theme-docs/style.css'
import '@rich-data/viewer/theme/base.css'

import type { AppProps } from 'next/app'

export default function Nextra ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
