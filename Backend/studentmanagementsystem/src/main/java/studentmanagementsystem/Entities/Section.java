package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class Section {

    private int crn;
    private int season;
    private int year;
    private int timeBlock;
    private String building;
    private int room;
    private String coursePrefix;
    private int courseNumber;
    private int instructorID;
    private int seats;

    // Default constructor
    public Section() {}

    // Parameterized constructor
    public Section(int crn, int season, int year, int timeBlock, String building, int room, String coursePrefix, int courseNumber, int instructorID, int seats) {
        this.crn = crn;
        this.season = season;
        this.year = year;
        this.timeBlock = timeBlock;
        this.building = building;
        this.room = room;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.instructorID = instructorID;
        this.seats = seats;
    }

    // Getters
    public int getCrn() {
        return crn;
    }

    public int getSeason() {
        return season;
    }

    public int getYear() {
        return year;
    }  

    public int getTimeBlock() {
        return timeBlock;
    }

    public String getBuilding() {
        return building;
    }

    public int getRoom() {
        return room;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public int getInstructorID() {
        return instructorID;
    }

    public int getSeats() {
        return seats;
    }

    // Setters
    public void setCrn(int crn) {
        this.crn = crn;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setTimeBlock(int timeBlock) {
        this.timeBlock = timeBlock;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public void setInstructorID(int instructorID) {
        this.instructorID = instructorID;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

}
