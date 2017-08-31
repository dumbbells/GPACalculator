import React, { Component } from 'react';
import $ from 'jquery';
import SelectMapping from '../objects/SelectMapping.js';
import ReactTooltip from 'react-tooltip';

class CourseTable extends Component {

    constructor(props) {
        super(props);

        this.onUnitChange = this.onUnitChange.bind(this);
        this.onRepeatChange = this.onRepeatChange.bind(this);
        this.onPrevGradeChange = this.onPrevGradeChange.bind(this);
        this.onProjGradeChange = this.onProjGradeChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onUnitChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("units", courseid, e.target.value);
    }

    onRepeatChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("repeat", courseid, e.target.checked);
    }

    onPrevGradeChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("prev-grade", courseid, e.target.value);
    }

    onProjGradeChange(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("proj-grade", courseid, e.target.value);
    }

    onRemove(e) {
        var courseid = $(e.target).parents("tr").attr("data-course-id");
        this.props.onChange("remove", courseid, e.target.value);
    }

    render() {
        var rows = this.props.rows.map(function(row, index) {
            var disable_prev_grd_chkbx = row.repeat ? false : true;
            return(
                <tr key={row.id} data-course-id={index}>
                    <td><p className="form-control-static">Course {index + 1}</p></td>
                    <td>
                        <select className="form-control calculator-units" onChange={this.onUnitChange}>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </td>
                    <td>
                        <label className="form-control-static">
                            <input id="repeatbox" className="calculator-repeat" type="checkbox" onChange={this.onRepeatChange} />
                        </label>
                    </td>
                    <td>
                        <PreviousGradeSelectBox onPrevGradeChange={this.onPrevGradeChange} disabled={disable_prev_grd_chkbx} />
                    </td>
                    <td>
                        <ProjectedGradeSelectBox prevGrade={row.previousGrade} onChange={this.onProjGradeChange} />
                    </td>

                    <td><button type="button" className="form-control-static close" onClick={this.onRemove}><span className="glyphicon glyphicon-remove"></span></button></td>
                </tr>
            );
        }.bind(this));
        return (
            <div>
                <form>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th data-tip='Mark how many credit hours each course is worth in this column.'>Credit Hours</th>
                            <th data-tip='Check the box if you have taken the class previously and plan to retake it this semester.'>Repeat?</th>
                            <th data-tip='You can select a previous grade if the repeat box is checked.'>Previous Grade</th>
                            <th data-tip='Enter a reasonable prediction for each course.'>Projected Grade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6">
                                <button type="button" className="pull-right btn btn-default" onClick={this.props.addCourse}><span className="glyphicon glyphicon-plus"></span> Add Course</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                </form>
            <ReactTooltip />
            </div>

        );
    }
}

class PreviousGradeSelectBox extends Component {

    render() {
        if(this.props.disabled)
        {
            return(
                <select className="form-control calculator-previous-grade" onChange={this.props.onPrevGradeChange} value="" disabled={this.props.disabled}>
                    <option></option>
                    <option>A</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B</option>
                    <option>B-</option>
                    <option>C+</option>
                    <option>C</option>
                    <option>C-</option>
                    <option>D+</option>
                    <option>D</option>
                    <option>D-</option>
                    <option>F</option>
                    <option>FN</option>
                </select>
            );
        }
        else
        {
            return(
                <select className="form-control calculator-previous-grade" onChange={this.props.onPrevGradeChange} disabled={this.props.disabled}>
                    <option></option>
                    <option>C-</option>
                    <option>D+</option>
                    <option>D</option>
                    <option>D-</option>
                    <option>F</option>
                    <option>FN</option>
                </select>
            );
        }
    }
}

class ProjectedGradeSelectBox extends Component {

    render() {
        var grades = SelectMapping.getGrades(this.props.prevGrade);
        var options = grades.map(function(grade, index) {
            return(
                <option key={index}>{grade}</option>
            );
        });

        return(
            <select className="form-control calculator-projected-grade" onChange={this.props.onChange}>
                <option></option>
                {options}
            </select>
        );
    }
}

export default CourseTable;
