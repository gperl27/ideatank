import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout, fetchAuthUser } from '../../modules/auth';

export default ChildComponent => {
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount() {
            if (localStorage.token && !this.props.authUser) {
                this.props.fetchAuthUser();
            }

            this.shouldNavigateAway();
        }

        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!localStorage.token) {
                this.props.signout();
            }
        }

        render() {
            if (localStorage.token && !this.props.authUser) {
                return <div>Loading...</div>
            }

            return <ChildComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        authUser: state.auth.authUser,
    });

    const mapDispatchToProps = dispatch => bindActionCreators({
        signout,
        fetchAuthUser,
    }, dispatch)

    return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};