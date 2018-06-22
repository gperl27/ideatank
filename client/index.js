import 'babel-polyfill';
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store';

window.axios = require('axios');

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