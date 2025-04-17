package studentmanagementsystem.interfaces.DAOInterfaces;

import studentmanagementsystem.Entities.Instructor;
import studentmanagementsystem.exceptions.InstructorNotFoundException;
import studentmanagementsystem.exceptions.DAOException;

public interface InstructorDAOInterface {

    Instructor getInstructorById(int id) throws InstructorNotFoundException, DAOException;

}
