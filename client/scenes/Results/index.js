import React from 'react';
import { Grid } from '@material-ui/core';

import Header from './components/Header';
import GameDetails from './components/GameDetails';
import Actions from './components/Actions';
import Participants from './components/Participants';
import Thoughts from './components/Thoughts';

class Results extends React.Component {

    render() {
        return (
            <Grid
                justify="center"
                alignItems="center"
                container
            >
                <Grid item xs={8}>
                    <Grid
                        spacing={40}
                        container
                        direction="column"
                        justify="space-around"
                    >
                        <Grid item>
                            <Header />
                        </Grid>
                        <Grid item>
                            <GameDetails />
                        </Grid>
                        <Grid item>
                            <Thoughts />
                        </Grid>
                        <Grid item>
                            <Participants />
                        </Grid>
                        <Grid item>
                            <Actions />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Results;