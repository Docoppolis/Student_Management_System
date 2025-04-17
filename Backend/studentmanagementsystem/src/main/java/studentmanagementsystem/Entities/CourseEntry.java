package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class CourseEntry {
    private String courseName;
    private String building;
    private int room;
    private int time;
    private String coursePrefix;
    private int courseNumber;
    private int seats;
    private int maxSeats;
    private String term;
    private String instructor;
    private int credits;
    private int crn;

    public CourseEntry(String courseName, String building, int room, int time,
                       String coursePrefix, int courseNumber, int seats, int maxSeats,
                       String term, String instructor, int credits, int crn) {
        this.courseName = courseName;
        this.building = building;
        this.room = room;
        this.time = time;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.seats = seats;
        this.maxSeats = maxSeats;
        this.term = term;
        this.instructor = instructor;
        this.credits = credits;
        this.crn = crn;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getBuilding() {
        return building;
    }

    public int getRoom() {
        return room;
    }

    public int getTime() {
        return time;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public int getSeats() {
        return seats;
    }

    public int getMaxSeats() {
        return maxSeats;
    }

    public String getTerm() {
        return term;
    }

    public String getInstructor() {
        return instructor;
    }

    public int getCredits() {
        return credits;
    }

    public int getCrn() {
        return crn;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public void setMaxSeats(int maxSeats) {
        this.maxSeats = maxSeats;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setCrn(int crn) {
        this.crn = crn;
    }

    @Override
    public String toString() {
        return "CourseEntry{" +
                "courseName='" + courseName + '\'' +
                ", building='" + building + '\'' +
                ", room=" + room +
                ", time=" + time +
                ", coursePrefix='" + coursePrefix + '\'' +
                ", courseNumber=" + courseNumber +
                ", seats=" + seats +
                ", maxSeats=" + maxSeats +
                ", term='" + term + '\'' +
                ", instructor='" + instructor + '\'' +
                ", credits=" + credits +
                ", crn=" + crn +
                '}';
    }
}
