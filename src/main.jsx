import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import NavBar from './NavBar.jsx'

import New from './New.jsx'
import BoiledEggTimer from './BoiledEggTimer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < BoiledEggTimer/>
  </StrictMode>,
)
