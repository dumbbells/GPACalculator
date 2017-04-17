class SelectMapping {
    
    static getGrades(grade) {
        var grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "FN"];
        var loc = grades.indexOf(grade);
        return grades.slice(0, loc);
    }
}

export default SelectMapping;