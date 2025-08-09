import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Exercise1 from './Exercise1.jsx'
import Exercise2 from './Exercise2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Exercise1 />    
    <Exercise2 />    
  </StrictMode>,
)
