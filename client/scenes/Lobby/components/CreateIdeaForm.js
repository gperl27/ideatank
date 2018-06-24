import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';

import RenderTextField from '../../../shared/input/RenderTextField';


const CreateIdea = ({
    handleSubmit,
    didAuthUserCreateAnIdea
}) =>
    <form onSubmit={handleSubmit}>
        <Field
            disabled={didAuthUserCreateAnIdea}
            name='description'
            component={RenderTextField}
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