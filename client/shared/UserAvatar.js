import React from 'react';
import { Avatar } from '@material-ui/core';

import { parseNameForAvatar } from '../lib/util'

const UserAvatar = ({ name, ...props }) =>
    <Avatar {...props}>
        {name && parseNameForAvatar(name)}
    </Avatar>

export default UserAvatar;