import React from 'react';
import { Route } from 'react-router-dom';
import Lobby from './Lobby'

const App = () =>
    <div>
        <Route exact path="/" component={Lobby} />
    </div>


export default App;
