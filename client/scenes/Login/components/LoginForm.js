import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../shared/input/RenderTextField';
import AuthFormWrapper from '../../../shared/layout/AuthFormWrapper';

const Login = ({
    handleSubmit,
}) =>
    <AuthFormWrapper
        handleSubmit={handleSubmit}
        submitText="Log In"
    >
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
    </AuthFormWrapper>

const LoginForm = reduxForm({
    form: 'login'
})(Login)

export default LoginForm