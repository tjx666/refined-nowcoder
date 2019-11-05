// import 'react-devtools';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './App.scss';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
);
