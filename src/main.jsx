import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { seedData } from './services/seed';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

seedData();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><AuthProvider><ToastProvider><App /></ToastProvider></AuthProvider></React.StrictMode>
);
