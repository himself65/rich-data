import '@rich-data/viewer/theme/basic.css'
import '@rich-data/json-plugin/theme/basic.css'

import type { AppProps } from 'next/app'

const App = function App ({
  Component,
  pageProps
}: AppProps) {
  return (
    <Component {...pageProps}/>
  )
}

export default App
