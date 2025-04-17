package studentmanagementsystem.exceptions;

public class StudentSectionNotFoundException extends Exception{

    // Default constructor
    public StudentSectionNotFoundException() {
        super("StudentSection not found");
    }

    // Constructor with a custom message
    public StudentSectionNotFoundException(String message) {
        super(message);
    }

    // Constructor with a custom message and cause (another exception)
    public StudentSectionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with only a cause
    public StudentSectionNotFoundException(Throwable cause) {
        super(cause);
    }

}
