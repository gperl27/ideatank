import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { msToMinutes } from '../../../lib/util';

const GameDetails = ({
    isBrainstorming,
    startButton,
    timer,
    activePhase,
    game,
}) =>
    <Grid container justify="space-around" alignItems="flex-end">
        <Grid item xs>
            <Typography gutterBottom variant='display2'>Round {activePhase.order}</Typography>
            <Typography gutterBottom variant='display1'>{game.description}</Typography>
            <Typography variant='title'>Round Length: {msToMinutes(activePhase.length)}</Typography>
        </Grid>
        <Grid item xs>
            <Grid container direction="column" alignItems="center" spacing={16}>
                <Grid item xs>
                    <Typography variant="title">
                        {isBrainstorming ? msToMinutes(timer) : timer}
                    </Typography>
                </Grid>
                <Grid item xs>
                    {startButton}
                </Grid>
            </Grid>
        </Grid>
    </Grid>

export default GameDetails;