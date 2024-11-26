import {createRoot} from 'react-dom/client';
import {Main} from './js/Main';
import './css/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        <div id="header">{"Ultimate Tic Tac Toe"}</div>
        <Main/>
    </>
);
