import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const GameDetails = ({
    game,
    startButton,
}) =>
    game &&
    <Fragment>
        <Typography variant='display2'>Round {game.phase.order}</Typography>
        <Typography variant='display1'>{game.description}</Typography>
        <Typography variant='title'>length: {game.phase.length}</Typography>
        {startButton}
    </Fragment>

export default GameDetails;