import React, { Component } from 'react';
import CurrentGPA from './CurrentGPA';
import CourseTable from './CourseTable';
import Course from '../objects/course';
import GpaMapping from '../objects/GpaMapping';

class GpaCalculator extends Component {
    
    auto_increment = 0;
    
    constructor(props) {
        super(props);
        
        this.state = {
            rows: [],
            currentGpa: 0,
            unitsAttempted: 0
        };
        
        this.onChange = this.onChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onCurrentGpaChange = this.onCurrentGpaChange.bind(this);
        this.onUnitsAttemptedChange = this.onUnitsAttemptedChange.bind(this);
        this.calculate = this.calculate.bind(this);
    }
    
    componentDidMount() {
        var course = new Course(this.auto_increment);
        this.auto_increment++;
        
        this.setState({
            rows: [course],
            currentGpa: 0,
            unitsAttempted: 0
        });
    }
    
    addCourse() {
        var rows = this.state.rows;
        var course = new Course(this.auto_increment);
        this.auto_increment++;
        
        rows[rows.length] = course;
        
        this.setState({rows: rows});
    }
    
    onChange(field, courseid, value) {
        var rows = this.state.rows;
        
        switch(field)
        {
            case "units":
                rows[courseid].units = value;
                this.setState({rows: rows});
                break;
            case "repeat":
                rows[courseid].repeat = value;
                this.setState({rows: rows});
                break;
            case "prev-grade":
                rows[courseid].previousGrade = value;
                this.setState({rows: rows});
                break;
            case "proj-grade":
                rows[courseid].projectedGrade = value;
                this.setState({rows: rows});
                break;
            case "remove":
                var rows = this.state.rows;
                if(rows.length > 1)
                {
                    rows.splice(courseid, 1);
                }
                this.setState({rows: rows});
                break;
            default:
                break;
        }
    }
    
    onCurrentGpaChange(value) {
        this.setState({currentGpa: value});
    }
    
    onUnitsAttemptedChange(value) {
        this.setState({unitsAttempted: value});
    }
    
    calculate() {
        var rows = this.state.rows;
        
        var current_hours_attempted = this.state.unitsAttempted;
        var current_gpa = this.state.currentGpa;
        var current_grade_points = current_gpa * current_hours_attempted;
        console.log("current_grade_points "+current_grade_points);
        
        var total_hours_attempted = 0;
        var upcoming_grade_points = 0;
        
        total_hours_attempted += Number(current_hours_attempted);
        
        for(var i = 0; i < rows.length; i++)
        {
            total_hours_attempted += Number(rows[i].units);
            upcoming_grade_points += Number(rows[i].units * GpaMapping.getPoints(rows[i].projectedGrade));
        }
        
        var total_grade_points = current_grade_points + upcoming_grade_points;
        var future_gpa = total_grade_points / total_hours_attempted;
        console.log("total_grade_points "+total_grade_points);
        console.log("total_hours_attempted "+total_hours_attempted);
        
        
        if(total_hours_attempted === 0) return;
        
        console.log(future_gpa);
        /*
         * current_grade_points = current_gpa * hours_attempted
         * total_hours_attempted = current_hours_attempted + upcoming_hours_attempted
         * total_grade_points = current_grade_points + upcoming_grade_points
         * future_gpa = total_grade_points / total_hours_attempted
         */
    }
    
    render() {
        return (
            <div>
                <h1>GPA Calculator</h1>
                <CurrentGPA onCurrentGpaChange={this.onCurrentGpaChange} onUnitsAttemptedChange={this.onUnitsAttemptedChange} />
                <CourseTable rows={this.state.rows} onChange={this.onChange} addCourse={this.addCourse} />
                <button onClick={this.calculate}>Click</button>
            </div>
        );
    }
}

export default GpaCalculator;
