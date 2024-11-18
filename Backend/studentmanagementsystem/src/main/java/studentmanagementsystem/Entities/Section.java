package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class Section {

    private String courseName;
    private String coursePrefix;
    private int time;
    private String building;
    private int room;
    private int courseNumber;
    private int credits;
    private int CRN;

    // Default constructor
    public Section() {
    }

    // Parameterized constructor
    public Section(String courseName, String coursePrefix, int courseNumber, int time, String building, int room, int credits, int CRN) {
        this.courseName = courseName;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.time = time;
        this.building = building;
        this.credits = credits;
        this.CRN = CRN;
    }

    // Getters and setters
    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public int getTime(){
        return time;
    }

    public void setTime(int time){
        this.time = time;
    }

    public String getBuilding(){
        return building;
    }

    public void setBuilding(String building){
        this.building = building;
    }

    public int getRoom(){
        return room;
    }

    public void setRoom(int room){
        this.room = room;
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

    public int getCRN() {
        return CRN;
    }

    public void setCRN(int CRN) {
        this.CRN = CRN;
    }

    // Override toString for better display
    @Override
    public String toString() {
        return "Section{" +
                "courseName='" + courseName + '\'' +
                ", coursePrefix='" + coursePrefix + '\'' +
                ", courseNumber=" + courseNumber +
                ", credits=" + credits +
                ", CRN=" + CRN +
                '}';
    }
}
