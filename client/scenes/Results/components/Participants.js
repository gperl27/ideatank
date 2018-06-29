import React from 'react';
import { Card, CardHeader, Grid, CardContent, List, ListItem, Typography, Avatar } from '@material-ui/core';

const Participants = () =>
    <div>
        <Typography variant="display1" gutterBottom>
            Participants
        </Typography>
        <Grid container spacing={24}>
            {
                [0, 1, 2].map(v =>
                    <Grid item xs={12} sm={4}>
                        <Card key={v}>
                            <Grid container>
                                <Grid item xs>
                                    <CardHeader
                                        avatar={<Avatar>R</Avatar>}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <CardContent>
                                        <Typography variant="subheading">Total Count:</Typography>
                                        <List>
                                            <ListItem>
                                                Round 1: 34
                                    </ListItem>
                                            <ListItem>
                                                Round 2: 3
                                    </ListItem>
                                            <ListItem>
                                                Round 3: 5
                                    </ListItem>
                                        </List>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card >
                    </Grid>
                )
            }
        </Grid>
    </div>

export default Participants;