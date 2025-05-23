import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import "./assets/styles/global.css";

import "./components/left-panel/style.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position='bottom-right'
    />
    <App />
  </StrictMode>,
)
