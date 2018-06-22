import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signin, signup } from '../../modules/auth';

const Login = ({ signin, signup }) =>
    <div>
        <button onClick={signin}>login</button>
        <button onClick={signup}>register</button>
    </div>

const mapDispatchToProps = dispatch => bindActionCreators({
    signin,
    signup,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
)(Login);