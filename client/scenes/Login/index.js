import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';

import { signin } from '../../modules/auth';

import AuthContainerWrapper from '../../shared/layout/AuthContainerWrapper';

class Login extends React.Component {

    submit = formData => this.props.signin(formData)

    render() {
        return (
            <AuthContainerWrapper
                url="/register"
                urlText="Sign Up"
            >
                <LoginForm onSubmit={this.submit} />
            </AuthContainerWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    signin,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
)(Login);