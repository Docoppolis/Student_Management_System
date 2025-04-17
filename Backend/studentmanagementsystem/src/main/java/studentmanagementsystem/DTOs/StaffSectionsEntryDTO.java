package DTOs;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class StaffSectionsEntryDTO {

    private String coursePrefix;
    private int courseNumber;
    private int crn;
    private int timeBlock;
    private String courseTitle;
    private int credits;
    private int seats;
    private int season;
    private int year;

    //Default constructor
    public StaffSectionsEntryDTO() {}

    //Parameterized constructor
    public StaffSectionsEntryDTO(String coursePrefix, int courseNumber, int crn, int timeBlock, String courseTitle, int credits, int seats, int season, int year) {
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.crn = crn;
        this.timeBlock = timeBlock;
        this.courseTitle = courseTitle;
        this.credits = credits;
        this.seats = seats;
        this.season = season;
        this.year = year;
    }

    //Getters
    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public int getCrn() {
        return crn;
    }

    public int getTimeBlock() {
        return timeBlock;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public int getCredits() {
        return credits;
    }

    public int getSeats() {
        return seats;
    }

    public int getSeason() {
        return season;
    }

    public int getYear() {
        return year;
    }

    //Setters
    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public void setCrn(int crn) {
        this.crn = crn;
    }

    public void setTimeBlock(int timeBlock) {
        this.timeBlock = timeBlock;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
