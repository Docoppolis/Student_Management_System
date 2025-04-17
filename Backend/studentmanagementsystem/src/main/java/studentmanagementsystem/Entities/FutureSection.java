package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class FutureSection {

    private String coursePrefix;
    private int courseNumber;
    private String courseTitle;
    private int credits;
    private int crn;
    private String term;
    
    //TODO: ADD DATETIME FOR REGISTRATION DATE
    private String regDate = "2021-04-01";

    //Constructor
    public FutureSection(String coursePrefix, int courseNumber, String courseTitle, int credits, int crn, String term){
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.courseTitle = courseTitle;
        this.credits = credits;
        this.crn = crn;
        this.term = term;
    }

    //Getters and setters
    public String getCoursePrefix() {
        return coursePrefix;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String title) {
        this.courseTitle = title;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public int getCrn() {
        return crn;
    }

    public void setCrn(int crn) {
        this.crn = crn;
    }

    public String getRegDate(){
        return regDate;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }
}
