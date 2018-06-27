import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';

import { parseNameForAvatar } from '../../../util';

const Players = ({ players }) =>
    <Grid container>
        {
            players && players.map(player =>
                <Grid item xs key={player._id}>
                    <Grid
                        container
                        direction="column"
                    >
                        <span>bulb</span>
                        <Avatar>{parseNameForAvatar(player.name)}</Avatar>
                    </Grid>
                </Grid>
            )
        }
    </Grid>

export default Players;