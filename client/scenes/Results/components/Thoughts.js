import React from 'react';
import { Typography, Paper } from '@material-ui/core';

const Thoughts = () =>
    <div>
        <Typography variant="display1" gutterBottom>
            Thoughts
        </Typography>
        {
            [0, 1, 2].map(v =>
                <Paper key={v}>
                    <Typography variant="title">
                        phase name here
                    </Typography>
                    <span>map thoughts of each round here</span>
                </Paper>
            )
        }
    </div>

export default Thoughts;