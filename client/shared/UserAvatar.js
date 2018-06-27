import React from 'react';
import { Avatar } from '@material-ui/core';

import { parseNameForAvatar } from '../util'

// const UserAvatar = ({ name }, props) => <Avatar {...props}>{name && parseNameForAvatar(name)}</Avatar>

const UserAvatar = ({ name, ...props }) =>
    <Avatar {...props}>
        {name && parseNameForAvatar(name)}
    </Avatar>

export default UserAvatar;