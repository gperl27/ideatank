import React from 'react';
import { Avatar } from '@material-ui/core';

import { parseNameForAvatar } from '../util'

const UserAvatar = ({ name }) => <Avatar>{name && parseNameForAvatar(name)}</Avatar>

export default UserAvatar;