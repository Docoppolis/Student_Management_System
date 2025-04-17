package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class CurrentRegistration {

    private int crn;
    private String courseTitle;
    private int credits;
    private String regDate; 
    private String coursePrefix; // New field for course prefix
    private int courseNumber;     // New field for course number

    // Constructor
    public CurrentRegistration(int crn, String courseTitle, int credits, String regDate, String coursePrefix, int courseNumber) {
        this.crn = crn;
        this.courseTitle = courseTitle;
        this.credits = credits;
        this.regDate = regDate;
        this.coursePrefix = coursePrefix; // Initialize course prefix
        this.courseNumber = courseNumber; // Initialize course number
    }

    // Getters
    public int getCrn() {
        return crn;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public int getCredits() {
        return credits;
    }

    public String getRegDate() {
        return regDate;
    }

    public String getCoursePrefix() {
        return coursePrefix; // Getter for course prefix
    }

    public int getCourseNumber() {
        return courseNumber; // Getter for course number
    }

    // Setters
    public void setCrn(int crn) {
        this.crn = crn;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix; // Setter for course prefix
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber; // Setter for course number
    }
}
