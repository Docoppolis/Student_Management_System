package studentmanagementsystem.Entities;

public class Department {

    private int depid;
    private String building;
    private int office;
    private String name;

    // Constructor  
    public Department() {}

    // Parameterized constructor
    public Department(int depid, String building, int office, String name) {
        this.depid = depid;
        this.building = building;
        this.office = office;
        this.name = name;
    }

    // Getters
    public int getDepid() {
        return depid;
    }

    public String getBuilding() {
        return building;
    }

    public int getOffice() {
        return office;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setDepid(int depid) {
        this.depid = depid;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public void setOffice(int office) {
        this.office = office;
    }

    public void setName(String name) {
        this.name = name;
    }
}
