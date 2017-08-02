import React, { Component } from 'react';

class CurrentGPA extends Component {
    
    constructor(props) {
        super(props);
        
        this.onCurrentGpaChange = this.onCurrentGpaChange.bind(this);
        this.onUnitsAttemptedChange = this.onUnitsAttemptedChange.bind(this);
    }
    
    onCurrentGpaChange(e) {
        this.props.onCurrentGpaChange(e.target.value);
    }
    
    onUnitsAttemptedChange(e) {
        this.props.onUnitsAttemptedChange(e.target.value);
    }
    
    render() {
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="current-gpa" className="control-label side-padding">Current GPA</label>
                        <input type="text" className="form-control" id="current-gpa" autoComplete="off" onChange={this.onCurrentGpaChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="units-attempted" className="control-label side-padding">Units Attempted</label>
                        <input type="text" className="form-control" id="units-attempted" autoComplete="off" onChange={this.onUnitsAttemptedChange} />
                    </div>
                </form>
            </div>
        );
    }
}

export default CurrentGPA;
