import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from "../src/Context/NotificationContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </NotificationProvider>
  </StrictMode>,
)
