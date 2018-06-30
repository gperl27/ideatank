import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

import Header from './components/Header';
import GameDetails from './components/GameDetails';
import Actions from './components/Actions';
import Participants from './components/Participants';
import Thoughts from './components/Thoughts';

const styles = {
    root: {
        marginTop: 50,
    },
};

class Results extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid
                className={classes.root}
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

export default withStyles(styles)(Results);