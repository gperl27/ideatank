import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar';

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
                        <UserAvatar name={player.name} />
                    </Grid>
                </Grid>
            )
        }
    </Grid>

export default Players;