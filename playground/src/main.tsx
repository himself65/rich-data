import { JsonViewer } from '@rich-data/viewer'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('app')).render(
  <div>
    <h1>Playground</h1>
    <div className='container'>
      <JsonViewer value={{
        number: 1
      }}/>
    </div>
  </div>
)
