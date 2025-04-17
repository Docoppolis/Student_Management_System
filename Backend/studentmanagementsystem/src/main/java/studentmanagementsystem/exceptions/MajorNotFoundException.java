package studentmanagementsystem.exceptions;



public class MajorNotFoundException extends Exception {

    public MajorNotFoundException() {
        super("Major not found");
    }

    public MajorNotFoundException(String message) {
        super(message);
    }

    public MajorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MajorNotFoundException(Throwable cause) {
        super(cause);
    }

}
