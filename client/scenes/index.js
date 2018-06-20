import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Lobby from './Lobby'
import Game from './Game'

const App = () =>
    <Switch>
        <Route exact path="/" component={Lobby} />
        <Route exact path="/game" component={Game} />
    </Switch>


export default App;
