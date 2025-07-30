import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // The only style import needed here.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);