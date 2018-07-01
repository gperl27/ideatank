import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from '@material-ui/core';

import RenderTextField from '../../../shared/input/RenderTextField';

const CreateThought = ({
    handleSubmit,
    isBrainstorming,
    userIsTyping,
}) =>
    <form onSubmit={handleSubmit}>
        <Field
            onChange={userIsTyping}
            disabled={!isBrainstorming}
            name='text'
            component={RenderTextField}
            label='Enter Thought'
            margin='normal'
        />
        <Button
            disabled={!isBrainstorming}
            type='submit'
        >
            Submit
        </Button>
    </form>

const CreateThoughtForm = reduxForm({
    form: 'createThought'
})(CreateThought)

export default CreateThoughtForm