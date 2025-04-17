package studentmanagementsystem.Entities;
import java.util.List;

public class Course {

    private String prefix;
    private int number;
    private int creditHours;
    private String title;
    private int departmentID;

    // Default constructor
    public Course() {}

    // Parameterized constructor
    public Course(String prefix, int number, int creditHours, String title, int departmentID) {
        this.prefix = prefix;
        this.number = number;
        this.creditHours = creditHours;
        this.title = title;
        this.departmentID = departmentID;
    }

    // Getters
    public String getPrefix() {
        return prefix;
    }
    
    public int getNumber() {
        return number;
    }

    public int getCreditHours() {
        return creditHours;
    }

    public String getTitle() {
        return title;
    }

    public int getDepartmentID() {
        return departmentID;
    }

    // Setters
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setCreditHours(int creditHours) {
        this.creditHours = creditHours;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDepartment(int departmentID) {
        this.departmentID = departmentID;
    }
    
}
