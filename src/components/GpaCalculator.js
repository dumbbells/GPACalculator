import React, { Component } from 'react';
import CurrentGPA from './CurrentGPA';
import CourseTable from './CourseTable';
import Course from '../objects/Course';
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
            unitsAttempted: 0
        };
        
        this.onChange = this.onChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onCurrentGpaChange = this.onCurrentGpaChange.bind(this);
        this.onUnitsAttemptedChange = this.onUnitsAttemptedChange.bind(this);
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
        
    }
    
    onCurrentGpaChange(value) {
        this.setState({currentGpa: value});
    }
    
    onUnitsAttemptedChange(value) {
        this.setState({unitsAttempted: value});
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
            unitsAttempted: 0
        });
    }
    
    render() {
        return (
            <div key={this.state.unique_id}>
                <h1>GPA Calculator</h1>
                <CurrentGPA onCurrentGpaChange={this.onCurrentGpaChange} onUnitsAttemptedChange={this.onUnitsAttemptedChange} />
                <CourseTable rows={this.state.rows} onChange={this.onChange} addCourse={this.addCourse} />
                <Results rows={this.state.rows} unitsAttempted={this.state.unitsAttempted} currentGpa={this.state.currentGpa} />
                <Reset onClick={this.reset} />
            </div>
        );
    }
}

export default GpaCalculator;
