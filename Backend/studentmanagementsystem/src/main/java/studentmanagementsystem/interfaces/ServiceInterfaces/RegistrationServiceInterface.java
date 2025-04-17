package studentmanagementsystem.interfaces.ServiceInterfaces;

import studentmanagementsystem.exceptions.RegistrationException;
import studentmanagementsystem.exceptions.ServiceException;


public interface RegistrationServiceInterface {

    void registerInstructor(Integer crn, int instructorID, int staffID) throws ServiceException, RegistrationException;
    void dropInstructor(Integer crn, int instructorID, int staffID) throws ServiceException, RegistrationException;
}
