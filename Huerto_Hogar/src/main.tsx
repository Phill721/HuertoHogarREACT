import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppNavegacion } from './AppNavegacion'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AppNavegacion/>
  </StrictMode>,
)
