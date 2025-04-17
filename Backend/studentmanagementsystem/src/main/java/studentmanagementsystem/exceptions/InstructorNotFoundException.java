package studentmanagementsystem.exceptions;

public class InstructorNotFoundException extends Exception {
    
    public InstructorNotFoundException() {
        super("Instructor not found");
    }

    public InstructorNotFoundException(String message) {
        super(message);
    }

    public InstructorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public InstructorNotFoundException(Throwable cause) {
        super(cause);
    }
}
