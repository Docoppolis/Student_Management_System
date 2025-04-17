package studentmanagementsystem.interfaces.DAOInterfaces;

import java.util.List;

import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.exceptions.CourseNotFoundException;
import studentmanagementsystem.exceptions.DAOException;

public interface CourseDAOInterface {
    
    Course getCourseByPrefixAndNumber(String prefix, int number) throws CourseNotFoundException, DAOException;
    void addCourse(Course course) throws DAOException;
    List<Course> getCoursesByDepartment(int depid) throws DAOException;
    void removeCourse(String prefix, int number) throws DAOException;

}
