import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm';

import { signin } from '../../modules/auth';


class Login extends React.Component {

    submit = formData => this.props.signin(formData)

    render() {
        return (
            <div>
                <Typography variant="headline">Login</Typography>
                <LoginForm onSubmit={this.submit} />
                <Link to="/register">Register</Link>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    signin,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
)(Login);