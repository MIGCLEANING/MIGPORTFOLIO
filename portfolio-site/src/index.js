import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname;

root.render(
  <React.StrictMode>
    {path === '/contact' ? <ContactPage /> : path === '/about' ? <AboutPage /> : <App />}
  </React.StrictMode>
);
