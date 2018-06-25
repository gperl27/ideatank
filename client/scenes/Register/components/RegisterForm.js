import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderTextField from '../../../shared/input/RenderTextField';
import AuthFormWrapper from '../../../shared/layout/AuthFormWrapper';

const Register = ({
    handleSubmit,
}) =>
    <AuthFormWrapper
        handleSubmit={handleSubmit}
        submitText="Sign Up"
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

const RegisterForm = reduxForm({
    form: 'register'
})(Register)

export default RegisterForm