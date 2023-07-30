import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Board } from './js/GameBoard';
import { ResetButtons } from './js/ResetButtons';
import './css/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <>
      <div id="header">{"Ultimate Tic Tac Toe"}</div>
      <ResetButtons />
      <Board />
    </>
  </StrictMode>
);
