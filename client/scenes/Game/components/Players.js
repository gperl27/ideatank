import React, { Fragment } from 'react';
import { Grid, Avatar } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar';

const Players = ({ authUser, players, usersTyping }) =>
    <Grid container>
        {
            players && players.map(player =>
                <Grid item xs key={player._id}>
                    <Grid
                        container
                        direction="column"
                    >
                        <span>
                            {
                                authUser._id === player._id ? "You"
                                    :

                                    usersTyping.includes(player._id) ? 'istyping' : 'not typing'
                            }
                        </span>
                        <UserAvatar name={player.name} />
                    </Grid>
                </Grid>
            )
        }
    </Grid>

export default Players;