import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import RegisterForm from './components/RegisterForm';

import { signup } from '../../modules/auth';


class Register extends React.Component {

    submit = formData => this.props.signup(formData)

    render() {
        return (
            <div>
                <Typography variant="headline">Register</Typography>
                <RegisterForm onSubmit={this.submit} />
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    signup,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
)(Register);