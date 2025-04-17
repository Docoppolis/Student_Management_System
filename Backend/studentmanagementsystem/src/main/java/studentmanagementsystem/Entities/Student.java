package studentmanagementsystem.Entities;

import java.math.BigDecimal;

public class Student {

    private int studentID;
    private String fname;
    private String lname;
    private BigDecimal phone;
    private String email;
    private String passhash;
    private int majorID;
    private String token;

    // Default constructor
    public Student() {}

    // Parameterized constructor
    public Student(int studentID, String fname, String lname, BigDecimal phone, String email, String passhash, int majorID, String token) {
        this.studentID = studentID;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.passhash = passhash;
        this.majorID = majorID;
        this.token = token;
    }

    // Getters
    public int getStudentID() {
        return studentID;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public BigDecimal getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPasshash() {
        return passhash;
    }

    public int getMajorID() {
        return majorID;
    }

    public String getToken() {
        return token;
    }

    // Setters
    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setPhone(BigDecimal phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasshash(String passhash) {
        this.passhash = passhash;
    }

    public void setMajorID(int majorID) {
        this.majorID = majorID;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
