import React, { Component } from 'react';

class Reset extends Component {
    
    render() {
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.props.onClick}><span className="glyphicon glyphicon-repeat"></span> Reset</button>
            </div>
        );
    }
}

export default Reset;
