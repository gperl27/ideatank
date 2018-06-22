import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Lobby from './Lobby'
import Game from './Game'
import Login from './Login'

import AuthHoc from '../shared/AuthHoc';

const App = () =>
    <Switch>
        <Route exact path="/" component={AuthHoc(Lobby)} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/login" component={Login} />
    </Switch>


export default App;
