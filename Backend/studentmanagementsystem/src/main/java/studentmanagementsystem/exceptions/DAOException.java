package studentmanagementsystem.exceptions;

import java.sql.SQLException;

public class DAOException extends Exception{

    //Default constructor
    public DAOException() {
        super("DAO Exception");
    }

    //Constructor with a custom message
    public DAOException(String message) {
        super(message);
    }

    //Constructor with a custom message and cause (another exception)
    public DAOException(String message, Throwable cause) {
        super(message, cause);
    }

    //Constructor with only a cause
    public DAOException(Throwable cause) {
        super(cause);
    }

}
