package studentmanagementsystem.interfaces.DAOInterfaces;

import studentmanagementsystem.Entities.Major;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.MajorNotFoundException;

public interface MajorsDAOInterface {

    Major getMajorByTitle(String title) throws MajorNotFoundException, DAOException;

}
