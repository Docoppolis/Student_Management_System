package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class StudentEntry {
    private String firstName;
    private String lastName;
    private String major;
    private String phone;
    private String studentId;

    // Constructor
    public StudentEntry(String firstName, String lastName, String major, String phone, String studentId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.major = major;
        this.phone = phone;
        this.studentId = studentId;
    }

    // Getters
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getMajor() {
        return major;
    }

    public String getPhone() {
        return phone;
    }

    public String getStudentId() {
        return studentId;
    }

    // Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "StudentEntry{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", major='" + major + '\'' +
                ", phone=" + phone +
                ", studentId=" + studentId +
                '}';
    }
}
