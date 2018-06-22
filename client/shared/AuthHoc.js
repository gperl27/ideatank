import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout } from '../modules/auth';

export default ChildComponent => {
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!localStorage.token) {
                console.log(this.props);
                this.props.signout();
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    const mapDispatchToProps = dispatch => bindActionCreators({
        signout,
    }, dispatch)

    return connect(null, mapDispatchToProps)(ComposedComponent);
};