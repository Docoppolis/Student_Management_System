package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Serializable
public class Register {

    private int crn;
    private String status;
    private String message;

    // Constructor
    public Register(int crn, String status, String message) {
        this.crn = crn;
        this.status = status;
        this.message = message;
    }

    // Getters and Setters
    public int getCrn() {
        return crn;
    }

    public void setCrn(int crn) {
        this.crn = crn;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
