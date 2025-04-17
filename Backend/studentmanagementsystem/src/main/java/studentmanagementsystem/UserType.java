package studentmanagementsystem;

public class UserType
{   	
    public static final int INVALID = -1;
    public static final int STUDENT = 0;
    public static final int INSTRUCTOR = 1;
    public static final int ADVISOR = 2;
    public static final int STAFF = 3;
    public static final int ADMIN = 4;

    private UserType() {}

    public static int UserIDToType(String id)
    {
        switch (id.charAt(0))
        {
            case 'U':
                return STUDENT;
            case 'I':
                return INSTRUCTOR;
            case 'A':
                return ADVISOR;
            case 'S':
                return STAFF;
            case 'D':
                return ADMIN;
            default:
                return INVALID;
        }
    }
}