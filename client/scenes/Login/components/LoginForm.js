import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import RenderTextField from '../../../shared/RenderTextField';

const Login = ({
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

const LoginForm = reduxForm({
    form: 'login'
})(Login)

export default LoginForm