import React from 'react';

const AuthWrapper = ({ children }, props) =>
    <div>
        {console.log(props, 'wrapper')}
        <div>authwrapper</div>
        {children}
    </div>

export default AuthWrapper;