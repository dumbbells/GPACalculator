import React, { Component } from 'react';
import $ from 'jquery';

class CourseTable extends Component {
    
    constructor(props) {
        super(props);
        
        this.onUnitChange = this.onUnitChange.bind(this);
        this.onRepeatChange = this.onRepeatChange.bind(this);
        this.onPrevGradeChange = this.onPrevGradeChange.bind(this);
        this.onProjGradeChange = this.onProjGradeChange.bind(this);
    }
    
    onUnitChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("units", courseid, e.target.value);
    }
    
    onRepeatChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("repeat", courseid, e.target.value);
    }
    
    onPrevGradeChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("prev-grade", courseid, e.target.value);
    }
    
    onProjGradeChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("proj-grade", courseid, e.target.value);
    }
    
    render() {
        var rows = this.props.rows.map(function(row, index) {
            return(
                <tr key={index} data-course-id={row.id}>
                    <td><p className="form-control-static">Course {row.id + 1}</p></td>
                    <td><input className="form-control calculator-units" type="text" onChange={this.onUnitChange} /></td>
                    <td>
                        <select className="form-control calculator-repeat" onChange={this.onRepeatChange}>
                            <option></option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                    <td><input className="form-control calculator-previous-grade" type="text" onChange={this.onPrevGradeChange} /></td>
                    <td><input className="form-control calculator-projected-grade" type="text" onChange={this.onProjGradeChange} /></td>
                </tr>
            );
        }.bind(this));
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Units</th>
                            <th>Repeat?</th>
                            <th>Previous Grade</th>
                            <th>Projected Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">
                                <button type="button" className="pull-right btn btn-default" onClick={this.props.addCourse}><span className="glyphicon glyphicon-plus"></span> Add Course</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default CourseTable;