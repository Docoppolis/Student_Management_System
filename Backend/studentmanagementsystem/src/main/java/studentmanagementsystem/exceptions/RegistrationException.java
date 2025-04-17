package studentmanagementsystem.exceptions;

public class RegistrationException extends Exception {

    // Default constructor
    public RegistrationException() {
        super("Registration failed");
    }

    // Constructor with a custom message
    public RegistrationException(String message) {
        super(message);
    }

    // Constructor with a custom message and cause (another exception)
    public RegistrationException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with only a cause
    public RegistrationException(Throwable cause) {
        super(cause);
    }

}
