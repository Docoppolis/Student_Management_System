package studentmanagementsystem.Entities;

public class User {

    private String email;
    private String password;
    private String id;
    private String auth;
    private int usertype;
    

    //Default constructor
    public User(){}

    //Constructor
    public User(String email, String password, String id, String auth, int usertype) {
        this.email = email;
        this.password = password;
        this.id = id;
        this.auth = auth;
        this.usertype = usertype;
    }

    //Getters
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getId() {
        return id;
    }

    public String getAuth() {
        return auth;
    }

    public int getUsertype() {
        return usertype;
    }

    //Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public void setUsertype(int usertype) {
        this.usertype = usertype;
    }

}
