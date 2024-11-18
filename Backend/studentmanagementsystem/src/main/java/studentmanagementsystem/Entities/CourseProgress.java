package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class CourseProgress {

    private String coursePrefix;
    private int courseNumber;
    private int credits;
    private String term;
    private boolean inProgress;


    // Default constructor
    public CourseProgress() {
    }

    // Parameterized constructor
    public CourseProgress(String coursePrefix, int courseNumber, int credits, String term, boolean inProgress) {
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.credits = credits;
        this.term = term;
        this.inProgress = inProgress;
    }

    // Getters and setters
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

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getTerm()
    {
        return term;
    }

    public void setTerm(String term)
    {
        this.term = term;
    }

    public boolean getProgress()
    {
        return inProgress;
    }

    public void setProgress(boolean inProgress)
    {
        this.inProgress = inProgress;
    }
}
