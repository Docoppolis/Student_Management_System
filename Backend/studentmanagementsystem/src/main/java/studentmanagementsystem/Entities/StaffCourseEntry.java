package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class StaffCourseEntry {
    private String courseName; 
    private String coursePrefix; 
    private int courseNumber;  
    private int credits; 
    private String major; 

    public StaffCourseEntry(String courseName, String coursePrefix, int courseNumber, int credits, String major) {
        this.courseName = courseName;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.credits = credits;
        this.major = major;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public int getCredits() {
        return credits;
    }

    public String getMajor() {
        return major;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public String toString() {
        return "StaffCourseEntry{" +
                "courseName='" + courseName + '\'' +
                ", coursePrefix='" + coursePrefix + '\'' +
                ", courseNumber=" + courseNumber +
                ", credits=" + credits +
                ", major=" + major +
                '}';
    }
}
