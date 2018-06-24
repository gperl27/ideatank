import React, { Component } from 'react';


export default ChildComponent => {
    class ComposedComponent extends Component {
        render() {

            return (
                <div>
                    <div>authwrapper</div>
                    <ChildComponent {...this.props} />
                </div>
            )
        }
    }

    return ComposedComponent
};