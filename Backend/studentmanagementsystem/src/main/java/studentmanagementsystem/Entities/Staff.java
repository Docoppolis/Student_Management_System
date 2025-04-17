package studentmanagementsystem.Entities;

import java.math.BigDecimal;

public class Staff {

    private int staffID;
    private String fName;
    private String lName;
    private BigDecimal phone;
    private String email;
    private String passHash;
    private int depid;
    private String token;

    //Default constructor
    public Staff(){}

    //Constructor
    public Staff(int staffID, String fName, String lName, BigDecimal phone, String email, String passHash, int depid, String token) {
        this.staffID = staffID;
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.email = email;
        this.passHash = passHash;
        this.depid = depid;
        this.token = token;
    }

    //Getters
    public int getStaffID() {
        return staffID;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public BigDecimal getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPassHash() {
        return passHash;
    }

    public int getDepid() {
        return depid;
    }

    public String getToken() {
        return token;
    }

    //Setters
    public void setStaffID(int staffID) {
        this.staffID = staffID;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public void setPhone(BigDecimal phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassHash(String passHash) {
        this.passHash = passHash;
    }

    public void setDepid(int depid) {
        this.depid = depid;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
