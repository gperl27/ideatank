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

let CreateIdeaForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name='description'
                component={renderTextField}
                label='Enter Idea'
                margin='normal'
            />
            <Button type='submit'>Submit</Button>
        </form>
    )
}

CreateIdeaForm = reduxForm({
    form: 'createIdea'
})(CreateIdeaForm)

export default CreateIdeaForm