import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

const Header = () =>
    <Fragment>
        <Typography variant="headline" gutterBottom>
            Nice work! You're already on your way to becoming the next Steve Jobs.
        </Typography>
        <Typography variant="headline">
            Here are the final results from your session:
        </Typography>
    </Fragment>

export default Header;