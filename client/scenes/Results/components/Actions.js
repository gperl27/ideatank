import React from 'react';
import { Grid, Button } from '@material-ui/core';

const Actions = ({ redirectToLobby }) =>
    <Grid container justify="center">
        <Grid item>
            <Button onClick={redirectToLobby}>Play Again</Button>
        </Grid>
        <Grid item>
            <Button>My Stats</Button>
        </Grid>
    </Grid>

export default Actions;