package studentmanagementsystem.Authentication;

public class InstructorRegistrationRequest {
    
    private String auth;
    private String id;
    private String instructorId;

    // Getters and setters
    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }
}
