import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/big-shoulders-display'
import '@fontsource/source-sans-3/400.css'
import '@fontsource/source-sans-3/400-italic.css'
import '@fontsource/source-sans-3/600.css'
import '@fontsource/b612-mono/400.css'
import '@fontsource/b612-mono/700.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Could not find root element to mount to')
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
