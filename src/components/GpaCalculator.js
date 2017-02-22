import React, { Component } from 'react';
import CurrentGPA from './CurrentGPA';
import CourseTable from './CourseTable';
import Course from '../objects/Course';
import GpaMapping from '../objects/GpaMapping';
import Results from './Results';
import Reset from './Reset';

class GpaCalculator extends Component {
    
    auto_increment = 0;
    unique_id = 0;
    
    constructor(props) {
        super(props);
        
        this.state = {
            unique_id: 0,
            rows: [],
            currentGpa: 0,
            unitsAttempted: 0,
            calculatedGpa: 0
        };
        
        this.onChange = this.onChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onCurrentGpaChange = this.onCurrentGpaChange.bind(this);
        this.onUnitsAttemptedChange = this.onUnitsAttemptedChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    componentDidMount() {
        var course = new Course(this.auto_increment);
        this.auto_increment++;
        this.unique_id++;
        
        this.setState({
            unique_id: this.unique_id,
            rows: [course],
            currentGpa: 0,
            unitsAttempted: 0,
            calculatedGpa: 0
        });
        
        this.calculate();
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
                rows[courseid].previousGrade = "";
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
                if(rows.length > 1)
                {
                    rows.splice(courseid, 1);
                }
                this.setState({rows: rows});
                break;
            default:
                break;
        }
        
        this.calculate();
    }
    
    onCurrentGpaChange(value) {
        this.setState({currentGpa: value});
    }
    
    onUnitsAttemptedChange(value) {
        this.setState({unitsAttempted: value});
    }
    
    calculate() {
        var rows = this.state.rows;
        
        if(this.state.unitsAttempted === 0 || this.state.currentGpa === 0)
        {
            //TODO: zero is an unacceptable check value
            this.setState({calculatedGpa: "Form needs more information"});
            return;
        }
        
        var current_hours_attempted = this.state.unitsAttempted;
        var current_gpa = this.state.currentGpa;
        var current_grade_points = current_gpa * current_hours_attempted;
        
        var total_hours_attempted = 0;
        var upcoming_grade_points = 0;
        
        total_hours_attempted += Number(current_hours_attempted);
        
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].units == undefined || rows[i].projectedGrade == undefined || rows[i].units == 0 || rows[i].projectedGrade == "")
            {
                this.setState({calculatedGpa: "Form needs more information"});
                return;
            }
            
            if(rows[i].repeat == true && (rows[i].previousGrade == undefined || rows[i].previousGrade == ""))
            {
                this.setState({calculatedGpa: "Form needs more information"});
                return;
            }
            
            if(rows[i].repeat)
            {
                current_grade_points -= Number(rows[i].units * GpaMapping.getPoints(rows[i].previousGrade));
            }
            else
            {
                total_hours_attempted += Number(rows[i].units);
            }
            
            upcoming_grade_points += Number(rows[i].units * GpaMapping.getPoints(rows[i].projectedGrade));
        }
        
        var total_grade_points = current_grade_points + upcoming_grade_points;
        var future_gpa = total_grade_points / total_hours_attempted;
        
        
        if(total_hours_attempted === 0) return;
        
        this.setState({calculatedGpa: future_gpa});
    }
    
    reset() {
        var course = new Course(this.auto_increment);
        this.auto_increment = 0;
        this.auto_increment++;
        this.unique_id++;
        
        this.setState({
            unique_id: this.unique_id,
            rows: [course],
            currentGpa: 0,
            unitsAttempted: 0,
            calculatedGpa: 0
        });
    }
    
    render() {
        return (
            <div key={this.state.unique_id}>
                <h1>GPA Calculator</h1>
                <CurrentGPA onCurrentGpaChange={this.onCurrentGpaChange} onUnitsAttemptedChange={this.onUnitsAttemptedChange} />
                <CourseTable rows={this.state.rows} onChange={this.onChange} addCourse={this.addCourse} />
                <Results gpa={this.state.calculatedGpa} />
                <Reset onClick={this.reset} />
            </div>
        );
    }
}

export default GpaCalculator;
