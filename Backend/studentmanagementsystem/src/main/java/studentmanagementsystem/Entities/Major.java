package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class Major {
    private int majorID;
    private String title;
    private int credits;
    private int depID;

    //Default constructor
    public Major(){}

    //Constructor
    public Major(int majorID, String title, int credits, int depID) {
        this.majorID = majorID;
        this.title = title;
        this.credits = credits;
        this.depID = depID;
    }

    //Getters
    public int getMajorID() {
        return majorID;
    }

    public String getTitle() {
        return title;
    }

    public int getCredits() {
        return credits;
    }

    public int getDepID() {
        return depID;
    }

    //Setters
    public void setMajorID(int majorID) {
        this.majorID = majorID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setDepID(int depID) {
        this.depID = depID;
    }
}
