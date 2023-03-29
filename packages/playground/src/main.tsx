import '@rich-data/viewer/theme/basic.css'
import '@rich-data/json-plugin/theme/basic.css'

import { lazy,StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const App = lazy(() => import('./App').then(({ App }) => ({ default: App })))

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
)
