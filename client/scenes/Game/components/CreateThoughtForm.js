import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';

import RenderTextField from '../../../shared/RenderTextField';


const CreateThought = ({
    handleSubmit,
}) =>
    <form onSubmit={handleSubmit}>
        <Field
            name='text'
            component={RenderTextField}
            label='Enter Thought'
            margin='normal'
        />
        <Button
            type='submit'
        >
            Submit
        </Button>
    </form>

const CreateThoughtForm = reduxForm({
    form: 'createThought'
})(CreateThought)

export default CreateThoughtForm