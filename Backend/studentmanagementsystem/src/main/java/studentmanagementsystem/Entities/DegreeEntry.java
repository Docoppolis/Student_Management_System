package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class DegreeEntry {
    private int courseNumber;
    private String coursePrefix;
    private int credits;
    private int year;
    private int term;
    private String grade;

    public DegreeEntry(int courseNumber, String coursePrefix, int credits, int year, int term, String grade) {
        this.courseNumber = courseNumber;
        this.coursePrefix = coursePrefix;
        this.credits = credits;
        this.year = year;
        this.term = term;
        this.grade = grade;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCredits() {
        return credits;
    }

    public int getYear() {
        return year;
    }

    public int getTerm() {
        return term;
    }

    public String getGrade()
    {
        return grade;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setTerm(int term) {
        this.term = term;
        }

    public void setGrade(String grade)
    {
        this.grade = grade;
    }
}
