import React, { Component } from 'react';
import GpaMapping from '../objects/GpaMapping';

class Results extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {calculatedGpa: ""};
        
        this.calculate = this.calculate.bind(this);
    }
    
    componentDidMount() {
        this.setState({calculatedGpa: ""});
        this.calculate();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props)
        {
            this.calculate();
        }
    }
    
    calculate() {
        var rows = this.props.rows;
        
        if(this.props.unitsAttempted == 0 || this.props.currentGpa == 0)
        {
            this.setState({calculatedGpa: "Form needs more information"});
            return;
        }
        
        if(this.props.unitsAttempted < 0)
        {
            this.setState({calculatedGpa: "Units attempted cannot be a negative value"});
            return;
        }
        
        if(this.props.currentGpa < 0)
        {
            this.setState({calculatedGpa: "Current GPA cannot be a negative value"});
            return;
        }
        if(this.props.currentGpa > 4)
        {
            this.setState({calculatedGpa: "Current GPA cannot be over 4.0"});
            return;
        }
        
        var current_hours_attempted = this.props.unitsAttempted;
        var current_gpa = this.props.currentGpa;
        var current_grade_points = current_gpa * current_hours_attempted;
        
        var total_hours_attempted = 0;
        var upcoming_grade_points = 0;
        
        total_hours_attempted += Number(current_hours_attempted);
        
        for(var i = 0; i < rows.length; i++)
        {
            console.log(rows[i]);
            if(rows[i].units === undefined || rows[i].units === "" || rows[i].projectedGrade === undefined || rows[i].units === 0 || rows[i].projectedGrade === "")
            {
                this.setState({calculatedGpa: "Form needs more information"});
                return;
            }
            
            if(rows[i].repeat === true && (rows[i].previousGrade === undefined || rows[i].previousGrade === ""))
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
        
        this.setState({calculatedGpa: future_gpa.toFixed(3)});
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <strong>GPA:</strong> {this.state.calculatedGpa}
                </div>
            </div>
        );
    }
}

export default Results;
