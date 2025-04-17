package studentmanagementsystem.interfaces.DAOInterfaces;

import studentmanagementsystem.exceptions.DAOException;

public interface CoursesMajorsDAOInterface {

    void addCourseToMajor(String coursePrefix, int courseNumber, int majorID) throws DAOException;

}
