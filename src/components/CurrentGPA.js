import React, { Component } from 'react';

class CurrentGPA extends Component {
    render() {
        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="current-gpa" className="col-sm-3 control-label">Current GPA</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="current-gpa" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="units-attempted" className="col-sm-3 control-label">Units Attempted</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="units-attempted" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CurrentGPA;
