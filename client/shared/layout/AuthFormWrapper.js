import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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