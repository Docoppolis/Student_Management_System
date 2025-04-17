package studentmanagementsystem.Entities;

public class CourseMajor {

    private String prefix;
    private int number;
    private int majorID;

    // Default constructor
    public CourseMajor() {}

    // Parameterized constructor
    public CourseMajor(String prefix, int number, int majorID) {
        this.prefix = prefix;
        this.number = number;
        this.majorID = majorID;
    }

    // Getters
    public String getPrefix() {
        return prefix;
    }

    public int getNumber() {
        return number;
    }

    public int getMajorID() {
        return majorID;
    }

    // Setters
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setMajorID(int majorID) {
        this.majorID = majorID;
    }

}
