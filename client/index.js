import 'babel-polyfill';
import 'typeface-roboto';
import './css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import io from 'socket.io-client';
import store, { history } from './store';

import registerWsListeners from './websocket';

// global requires
window.axios = require('axios');
// we want the client socket to only connect once
window.socket = io('http://localhost:3000');
registerWsListeners(socket);

import App from './scenes';

const target = document.querySelector('#app');

if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

const renderApp = () => {
    return ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <App />
                </div>
            </ConnectedRouter>
        </Provider>,
        target
    );
}

renderApp()