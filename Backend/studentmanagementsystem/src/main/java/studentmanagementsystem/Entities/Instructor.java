package studentmanagementsystem.Entities;

public class Instructor {

    private int instructorID;
    private String fName;
    private String lName;
    private int phone;
    private String email;
    private String passHash;
    private int depid;
    private String token;


    //Default constructor
    public Instructor(){}

    //Constructor
    public Instructor(int instructorID, String fName, String lName, int phone, String email, String passHash, int depid, String token) {
        this.instructorID = instructorID;
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.email = email;
        this.passHash = passHash;
        this.depid = depid;
        this.token = token;
    }

    //Getters
    public int getInstructorID() {
        return instructorID;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public int getPhone() {
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
    public void setInstructorID(int instructorID) {
        this.instructorID = instructorID;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public void setPhone(int phone) {
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
