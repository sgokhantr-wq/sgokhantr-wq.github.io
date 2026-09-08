import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/big-shoulders-display'
import '@fontsource/source-sans-3/600.css'
import '@fontsource/b612-mono/700.css'
import './styles/tokens.css'
import './styles/base.css'
import { OgCard } from './components/OgCard'

document.documentElement.setAttribute('data-theme', 'light')
const root = document.getElementById('root')
if (!root) throw new Error('Could not find root element to mount to')
createRoot(root).render(
  <StrictMode>
    <OgCard />
  </StrictMode>,
)
