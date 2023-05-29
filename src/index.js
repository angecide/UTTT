import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/style.css';
import { Board } from './js/Components';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Board />
  </StrictMode>
);
