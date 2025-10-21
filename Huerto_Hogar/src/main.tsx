import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppNavegacion } from './AppNavegacion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/navbar.css'
import './css/index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AppNavegacion/>
  </StrictMode>,
)
