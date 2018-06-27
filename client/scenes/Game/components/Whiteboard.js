import React from 'react';
import { Paper, Grid, Avatar, Typography } from '@material-ui/core';

import CreateThoughtForm from './CreateThoughtForm';
import UserAvatar from '../../../shared/UserAvatar';

const Whiteboard = ({
    timer,
    isBrainstorming,
    onSubmit,
    thoughts,
}) =>
    <Paper>
        <Grid container>
            <Grid item sm={12} md={4}>
                <Grid container direction="column">
                    <Grid item xs>
                        Time left: {timer}
                    </Grid>
                    <Grid item xs>
                        <CreateThoughtForm
                            isBrainstorming={isBrainstorming}
                            onSubmit={onSubmit}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
                <Grid container>
                    {
                        thoughts && thoughts.map(thought =>
                            <Grid item xs key={thought._id}>
                                <Grid container>
                                    <Grid item xs>
                                        {console.log(thought.user.name, thought)}
                                        <UserAvatar name={thought.user.name} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1">{thought.text}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    </Paper>

export default Whiteboard;