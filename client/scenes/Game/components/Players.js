import React from 'react';
import LightbulbOutline from '@material-ui/icons/LightbulbOutline';

import { Grid } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar';

const Players = ({ authUser, players, usersTyping }) =>
    <Grid container alignItems="flex-end">
        {
            players && players.map(player =>
                <Grid item xs key={player._id}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        {
                            authUser._id !== player._id ?
                                <LightbulbOutline
                                    style={
                                        usersTyping.includes(player._id) ?
                                            {
                                                color: 'yellow',
                                            }
                                            :
                                            null
                                    }
                                />
                                : null
                        }
                        <UserAvatar
                            name={player.name}
                            style={
                                authUser._id === player._id ?
                                    {
                                        border: '1px solid black',
                                    }
                                    : null
                            }
                        />
                    </Grid>
                </Grid>
            )
        }
    </Grid>

export default Players;