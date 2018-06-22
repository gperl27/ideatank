import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const renderTextField = ({
    input,
    ...custom
}) => (
        <TextField
            {...input}
            {...custom}
        />
    )

const CreateIdea = ({
    handleSubmit,
    didAuthUserCreateAnIdea
}) =>
    <form onSubmit={handleSubmit}>
        <Field
            disabled={didAuthUserCreateAnIdea}
            name='description'
            component={renderTextField}
            label='Enter Idea'
            margin='normal'
        />
        <Button
            disabled={didAuthUserCreateAnIdea}
            type='submit'
        >
            Submit
        </Button>
    </form>

const CreateIdeaForm = reduxForm({
    form: 'createIdea'
})(CreateIdea)

export default CreateIdeaForm