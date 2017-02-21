import React, { Component } from 'react';

class CurrentGPA extends Component {
    render() {
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="current-gpa" className="control-label side-padding">Current GPA</label>
                        <input type="text" className="form-control" id="current-gpa" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="units-attempted" className="control-label side-padding">Units Attempted</label>
                        <input type="text" className="form-control" id="units-attempted" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CurrentGPA;
