import React, { Component } from 'react';
import CurrentGPA from './CurrentGPA';
import CourseTable from './CourseTable';

class GpaCalculator extends Component {
    render() {
        return (
            <div>
                <h1>GPA Calculator</h1>
                <CurrentGPA />
                <CourseTable />
            </div>
        );
    }
}

export default GpaCalculator;
