package studentmanagementsystem.interfaces.ServiceInterfaces;

import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.InsertionException;

public interface InsertionServiceInterface {

    void addNewCourse(String prefix, int number, int credits, String title, int staffID, String majorTitle) throws ServiceException, DAOException;
    void removeCourse(String prefix, int number) throws ServiceException;
    void addNewSection(int crn, String prefix, int number, int timeBlock, String building, int room, int season, int year, int seats) throws ServiceException;

}
