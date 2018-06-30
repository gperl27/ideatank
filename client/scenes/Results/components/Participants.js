import React from 'react';
import { Card, CardHeader, Grid, CardContent, List, ListItem, Typography, ListItemText } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar'

const Participants = ({ participants }) =>
    <div>
        <Typography variant="display1" gutterBottom>
            Participants
        </Typography>
        <Grid container spacing={24}>
            {
                participants.map(({ user, userPhaseData }) =>
                    <Grid key={user._id} item xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader
                                avatar={<UserAvatar name={user.name} />}
                            />
                            <CardContent>
                                <Typography variant="subheading">Total Contributions:</Typography>
                                {
                                    userPhaseData.map(({ phase, userThoughts }) =>
                                        <List key={phase._id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`Round ${phase.order}`}
                                                    secondary={userThoughts}
                                                />
                                            </ListItem>
                                        </List>
                                    )
                                }
                            </CardContent>
                        </Card >
                    </Grid>
                )
            }
        </Grid>
    </div >

export default Participants;