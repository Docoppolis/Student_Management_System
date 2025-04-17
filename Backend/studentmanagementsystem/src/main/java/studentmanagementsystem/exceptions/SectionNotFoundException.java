package studentmanagementsystem.exceptions;

public class SectionNotFoundException extends Exception{

    // Default constructor
    public SectionNotFoundException() {
        super("Section not found");
    }

    // Constructor with a custom message
    public SectionNotFoundException(String message) {
        super(message);
    }

    // Constructor with a custom message and cause (another exception)
    public SectionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with only a cause
    public SectionNotFoundException(Throwable cause) {
        super(cause);
    }

}
