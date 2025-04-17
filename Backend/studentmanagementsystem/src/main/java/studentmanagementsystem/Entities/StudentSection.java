package studentmanagementsystem.Entities;

public class StudentSection {

    private int studentID;
    private int CRN;
    private String grade;

    // Default constructor
    public StudentSection() {}

    // Parameterized constructor
    public StudentSection(int studentID, int CRN, String grade) {
        this.studentID = studentID;
        this.CRN = CRN;
        this.grade = grade;
    }

    // Getters
    public int getStudentID() {
        return studentID;
    }

    public int getCRN() {
        return CRN;
    }

    public String getGrade() {
        return grade;
    }

    // Setters
    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public void setCRN(int CRN) {
        this.CRN = CRN;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

}
