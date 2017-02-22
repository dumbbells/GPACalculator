import React, { Component } from 'react';

class Results extends Component {
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <strong>GPA:</strong> {this.props.gpa}
                </div>
            </div>
        );
    }
}

export default Results;
