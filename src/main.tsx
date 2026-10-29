import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './style.css';
import './list.css';
import './checker.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './components/ErrorBoundary.js';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${import.meta.env.BASE_URL}serviceworker.js`, { scope: import.meta.env.BASE_URL })
    .catch(error => console.error('Failed to register Checkminder offline support:', error));
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
