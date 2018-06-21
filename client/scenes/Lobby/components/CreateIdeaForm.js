import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form'

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
                name="idea"
                component={renderTextField}
                label="Enter Idea"
                margin="normal"
            />
        </form>
    )
}

CreateIdeaForm = reduxForm({
    form: 'createIdea'
})(CreateIdeaForm)

export default CreateIdeaForm