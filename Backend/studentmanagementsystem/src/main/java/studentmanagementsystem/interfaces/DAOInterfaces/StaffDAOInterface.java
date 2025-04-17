package studentmanagementsystem.interfaces.DAOInterfaces;

import studentmanagementsystem.Entities.Staff;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.StaffNotFoundException;

public interface StaffDAOInterface {

    Staff getStaffById(int id) throws StaffNotFoundException, DAOException;

}
