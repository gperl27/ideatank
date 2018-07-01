import React from 'react';
import { Grid, Button } from '@material-ui/core';

const AuthFormWrapper = ({
    children,
    handleSubmit,
    submitText,
}) =>
    <form onSubmit={handleSubmit}>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            {children}
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                {submitText}
            </Button>
        </Grid>
    </form>

export default AuthFormWrapper;