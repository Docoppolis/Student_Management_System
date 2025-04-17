package studentmanagementsystem.exceptions;

public class InsertionException extends Exception {

    public InsertionException() {
        super("Error inserting data");
    }

    public InsertionException(String message) {
        super(message);
    }

    public InsertionException(String message, Throwable cause) {
        super(message, cause);
    }

    public InsertionException(Throwable cause) {
        super(cause);
    }

}
