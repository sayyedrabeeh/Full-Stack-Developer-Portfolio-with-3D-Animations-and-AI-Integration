import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import emailjs from '@emailjs/browser';

emailjs.init("D9EU6dPNWw6qO0DF7");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      </BrowserRouter>
  </StrictMode>,
)
