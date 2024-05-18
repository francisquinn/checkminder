import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/checkminder/serviceworker.js', { scope: '/checkminder/' });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
