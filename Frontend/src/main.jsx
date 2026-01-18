import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import emailjs from '@emailjs/browser';
import { BackendProvider } from './api/BackendContext.jsx';

emailjs.init("D9EU6dPNWw6qO0DF7");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BackendProvider>
  <App />
</BackendProvider>
      </BrowserRouter>
  </StrictMode>,
)
