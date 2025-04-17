package studentmanagementsystem.exceptions;

public class CourseNotFoundException extends Exception{

    // Default constructor
    public CourseNotFoundException() {
        super("Course not found");
    }

    // Constructor with a custom message
    public CourseNotFoundException(String message) {
        super(message);
    }

    // Constructor with a custom message and cause (another exception)
    public CourseNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with only a cause
    public CourseNotFoundException(Throwable cause) {
        super(cause);
    }
}
