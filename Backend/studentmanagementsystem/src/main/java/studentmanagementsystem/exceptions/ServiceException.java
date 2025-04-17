package studentmanagementsystem.exceptions;

public class ServiceException extends Exception{

    // Default constructor
    public ServiceException() {
        super("Service Exception");
    }

    // Constructor with a custom message
    public ServiceException(String message) {
        super(message);
    }

    // Constructor with a custom message and cause (another exception)
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with only a cause
    public ServiceException(Throwable cause) {
        super(cause);
    }

}
