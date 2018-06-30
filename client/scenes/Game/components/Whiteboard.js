import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

import CreateThoughtForm from './CreateThoughtForm';
import UserAvatar from '../../../shared/UserAvatar';

const styles = {
    paper: {
        padding: 25
    },
    root: {
        minHeight: '50vh',
    },
    thought: {
        marginTop: 5,
    },
    avatar: {
        marginRight: 10,
    },
    thoughtText: {
        flexGrow: 2,
    },
};

const Whiteboard = ({
    classes,
    isBrainstorming,
    onSubmit,
    activePhase,
    userIsTyping,
}) =>
    <Paper className={classes.paper} >
        <Grid className={classes.root} container>
            <Grid item sm={12} md={4}>
                <Grid container direction="column">
                    <Grid item xs>
                        <CreateThoughtForm
                            userIsTyping={userIsTyping}
                            isBrainstorming={isBrainstorming}
                            onSubmit={onSubmit}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={8} container>
                {
                    activePhase.thoughts.map(thought =>
                        <Grid className={classes.thought} item xs={4} key={thought._id}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <UserAvatar className={classes.avatar} name={thought.user.name} />
                                <Typography className={classes.thoughtText} variant="body1">{thought.text}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    </Paper>

export default withStyles(styles)(Whiteboard);