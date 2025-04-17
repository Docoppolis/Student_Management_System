package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class StaffInstructorEntry {
    private String firstName;
    private String lastName;
    private String phone; 
    private String instructorId;

    public StaffInstructorEntry(String firstName, String lastName, String phone, String instructorId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.instructorId = instructorId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhone() {
        return phone;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }

    @Override
    public String toString() {
        return "StaffInstructorEntry{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone=" + phone + 
                ", instructorId='" + instructorId + '\'' +
                '}';
    }
}
