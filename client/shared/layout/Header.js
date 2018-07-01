import React from 'react';
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withStyles, AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'

import { signout } from '../../modules/auth';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
};


class Header extends React.Component {
    state = { anchorEl: null };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSignout = () => {
        this.handleClose();
        this.props.signout();
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { authUser, classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar className={classes.root} position="static" color="default">
                <Toolbar>
                    <Typography
                        className={classes.flex}
                        variant="title"
                        color="inherit"
                    >
                        {process.env.APP_NAME || 'solvr'}
                    </Typography>
                    {
                        authUser &&
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleSignout}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}


const mapStateToProps = state => ({
    authUser: state.auth.authUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signout,
}, dispatch)


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Header)