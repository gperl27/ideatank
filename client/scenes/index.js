import React from 'react';
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom';
import Lobby from './Lobby'
import Game from './Game'
import Login from './Login'
import Register from './Register'
import Results from './Results'

import AuthHoc from '../shared/hoc/Auth';
import UseHeader from '../shared/hoc/UseHeader';

const App = () =>
    <Switch>
        <Route exact path="/" component={
            compose(
                UseHeader,
                AuthHoc
            )(Lobby)
        } />
        <Route exact path="/game" component={AuthHoc(Game)} />
        <Route exact path="/login" component={UseHeader(Login)} />
        <Route exact path="/register" component={UseHeader(Register)} />
        <Route exact path="/results" component={Results} />
    </Switch>


export default App;
