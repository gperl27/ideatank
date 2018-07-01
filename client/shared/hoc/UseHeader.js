import React, { Component, Fragment } from 'react';

import Header from '../layout/Header'

export default ChildComponent => {
    class ComposedComponent extends Component {
        render() {
            return (
                <Fragment>
                    <Header />
                    <ChildComponent {...this.props} />
                </Fragment>
            )
        }
    }

    return ComposedComponent
};