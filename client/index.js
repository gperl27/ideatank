import 'babel-polyfill';
import 'typeface-roboto';
import './css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import io from 'socket.io-client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import store, { history } from './store';

import registerWsListeners from './websocket';

// global requires
window.axios = require('axios');

// which api to consume
if (process.env.NODE_ENV === 'production') {
    window.apiUri = process.env.PROD_API_URI
} else {
    window.apiUri = process.env.DEV_API_URI
}

// we want the client socket to only connect once
window.socket = io(window.apiUri);
registerWsListeners(socket);

import App from './scenes';

const target = document.querySelector('#app');

document.title = process.env.APP_NAME || 'solvr'

if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = localStorage.token;
}

const renderApp = () => {
    return ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <App />
                    </div>
                </MuiThemeProvider>
            </ConnectedRouter>
        </Provider>,
        target
    );
}

renderApp()