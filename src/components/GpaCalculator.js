import React, { Component } from 'react';
import CurrentGPA from './CurrentGPA';
import CourseTable from './CourseTable';
import Course from '../objects/course';

class GpaCalculator extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            rows: []
        };
        
        this.onChange = this.onChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
    }
    
    componentDidMount() {
        var course = new Course(0);
        
        this.setState({
            rows: [course]
        });
    }
    
    addCourse() {
        var rows = this.state.rows;
        var course = new Course(rows.length);
        
        rows[rows.length] = course;
        
        this.setState({rows: rows});
    }
    
    onChange(field, courseid, value) {
        switch(field)
        {
            case "units":
                console.log(value);
                break;
            case "repeat":
                console.log(value);
                break;
            case "prev-grade":
                console.log(value);
                break;
            case "proj-grade":
                console.log(value);
                break;
            default:
                break;
        }
    }
    
    render() {
        return (
            <div>
                <h1>GPA Calculator</h1>
                <CurrentGPA />
                <CourseTable rows={this.state.rows} onChange={this.onChange} addCourse={this.addCourse} />
            </div>
        );
    }
}

export default GpaCalculator;
