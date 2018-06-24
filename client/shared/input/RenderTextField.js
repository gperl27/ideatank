import React from 'react';
import TextField from '@material-ui/core/TextField';

const RenderTextField = ({
    input,
    ...custom
}) => (
        <TextField
            {...input}
            {...custom}
        />
    )

export default RenderTextField