import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterForm from './components/RegisterForm';

import { signup } from '../../modules/auth';
import AuthContainerWrapper from '../../shared/layout/AuthContainerWrapper';

class Register extends React.Component {

    submit = formData => this.props.signup(formData)

    render() {
        return (
            <AuthContainerWrapper
                url="/login"
                urlText="Login"
            >
                <RegisterForm onSubmit={this.submit} />
            </AuthContainerWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    signup,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
)(Register);