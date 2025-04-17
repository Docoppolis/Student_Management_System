package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class ScheduleEntry {
    private String courseName;
    private String building;
    private int room;
    private int time;
    private String coursePrefix;
    private int courseNumber;

    // Constructor
    public ScheduleEntry(String courseName, String building, int room, int time,
                         String coursePrefix, int courseNumber) {
        this.courseName = courseName;
        this.building = building;
        this.room = room;
        this.time = time; // Now an int
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
    }

    // Getters
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

    // Setters
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

    @Override
    public String toString() {
        return "ScheduleEntry{" +
                "courseName='" + courseName + '\'' +
                ", building='" + building + '\'' +
                ", room=" + room +
                ", time=" + time + // Now displays an int
                ", coursePrefix='" + coursePrefix + '\'' +
                ", courseNumber=" + courseNumber +
                '}';
    }
}
