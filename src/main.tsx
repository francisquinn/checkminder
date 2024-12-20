import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/checkminder/serviceworker.js', { scope: '/checkminder/' });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
