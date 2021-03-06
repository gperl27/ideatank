import React from 'react';
import { Typography, Paper, Grid, withStyles, List, ListItem, ListItemText } from '@material-ui/core';

const styles = {
    paper: {
        padding: '25px 15px',
    }
}

const Thoughts = ({ phases, classes, }) =>
    <div>
        <Typography variant="display1" gutterBottom>
            Thoughts
        </Typography>
        <Grid container direction="column" spacing={24}>
            {
                phases && phases.map(phase =>
                    phase.instructions &&
                    phase.length &&
                    <Grid item key={phase._id}>
                        <Paper className={classes.paper}>
                            <Typography variant="title" gutterBottom>
                                {phase.instructions}
                            </Typography>
                            {
                                phase.thoughts && phase.thoughts.length > 0 &&
                                phase.thoughts.map(thought =>
                                    <List key={thought._id}>
                                        <ListItem>
                                            <ListItemText primary={thought.text} />
                                        </ListItem>
                                    </List>
                                )
                            }
                        </Paper>
                    </Grid>
                )
            }
        </Grid>
    </div>

export default withStyles(styles)(Thoughts);