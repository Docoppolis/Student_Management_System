package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class InstructorCourseEntry {
    private String coursePrefix;
    private int courseNumber;
    private String courseName;
    private int credits;
    private String averageGrade;
    private int year;
    private int semester;

    public InstructorCourseEntry(String coursePrefix, int courseNumber, String courseName, int credits, String averageGrade, int year, int semester) {
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.credits = credits;
        this.averageGrade = averageGrade;
        this.year = year;
        this.semester = semester;
    }

    
    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }

    public int getCredits() {
        return credits;
    }

    public String getAverageGrade() {
        return averageGrade;
    }

    public int getYear() {
        return year;
    }

    public int getSemester() {
        return semester;
    }
}