package DTOs;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class DepartmentReportDTO {

    private String departmentName;
    private float averageGPA;

    //Default constructor
    public DepartmentReportDTO() {}

    //Constructor
    public DepartmentReportDTO(String departmentName, float averageGPA) {
        this.departmentName = departmentName;
        this.averageGPA = averageGPA;
    }

    //Getters
    public String getDepartmentName() {
        return departmentName;
    }

    public float getAverageGPA() {
        return averageGPA;
    }

    //Setters
    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public void setAverageGPA(float averageGPA) {
        this.averageGPA = averageGPA;
    }

}
