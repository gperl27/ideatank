import React from 'react';
import { Grid, Button } from '@material-ui/core';

const Actions = () => 
    <Grid container justify="center">
        <Grid item>
            <Button>Play Again</Button>
        </Grid>
        <Grid item>
            <Button>My Stats</Button>
        </Grid>
    </Grid>
 
export default Actions;