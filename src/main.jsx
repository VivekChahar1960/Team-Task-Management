import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from "../src/Context/NotificationContext.jsx";
import './index.css'
import App from './App.jsx'
import { AlertProvider } from './Context/AlertContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <AlertProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AlertProvider>
    </NotificationProvider>
  </StrictMode>,
)
