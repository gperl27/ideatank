import React from 'react';
import { Avatar } from '@material-ui/core';

import { parseNameForAvatar } from '../util'

const UserAvatar = ({ classes, name }) => <Avatar className={classes}>{name && parseNameForAvatar(name)}</Avatar>

export default UserAvatar;