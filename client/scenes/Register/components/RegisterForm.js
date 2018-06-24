import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import RenderTextField from '../../../shared/input/RenderTextField';

const Register = ({
    handleSubmit,
}) =>
    <form onSubmit={handleSubmit}>
        <Field
            name='email'
            component={RenderTextField}
            label='Email'
            margin='normal'
        />
        <Field
            name='password'
            component={RenderTextField}
            label='Password'
            margin='normal'
            type="password"
        />
        <Button type='submit'>
            Submit
        </Button>
    </form>

const RegisterForm = reduxForm({
    form: 'register'
})(Register)

export default RegisterForm