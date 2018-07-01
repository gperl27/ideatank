import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles, Grid, Paper, Divider, Button } from '@material-ui/core';

const styles = {
    root: {
        marginTop: 50,
    },
    divider: {
        marginTop: 25,
        width: '100%',
    }
};

const AuthContainerWrapper = ({
    children,
    url,
    urlText,
    classes,
}) =>
    <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
    >
        <Grid item xs={10} sm={6} md={3} lg={3} xl={2}>
            <Paper>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {children}
                    <Divider className={classes.divider} />
                    <Button component={Link} to={url}>
                        {urlText}
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    </Grid>

export default withStyles(styles)(AuthContainerWrapper);