import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { msToMinutes } from '../../../util';

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
                {/* {isBrainstorming &&
                    <Grid item xs>
                        <CircularProgress
                            size={96}
                            variant="static"
                            value={normalizeTime(game.phase.length, timer)}
                        />
                    </Grid>
                } */}
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