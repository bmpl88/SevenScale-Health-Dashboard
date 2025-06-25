// SevenScale MVP - Entry Point Isolado
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/mvp">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);