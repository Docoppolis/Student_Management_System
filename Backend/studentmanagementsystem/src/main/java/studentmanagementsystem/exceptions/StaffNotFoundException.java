package studentmanagementsystem.exceptions;

public class StaffNotFoundException extends Exception {

    public StaffNotFoundException() {
        super("Staff not found");
    }

    public StaffNotFoundException(String message) {
        super(message);
    }

    public StaffNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public StaffNotFoundException(Throwable cause) {
        super(cause);
    }

}
