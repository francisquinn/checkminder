import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './style.css';
import { BrowserRouter } from 'react-router-dom';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/checkminder/serviceworker.js', { scope: '/checkminder/' });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
