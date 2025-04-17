package studentmanagementsystem.interfaces.DAOInterfaces;

import java.sql.SQLException;
import java.util.List;
import studentmanagementsystem.Entities.StudentSection;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.StudentSectionNotFoundException;


public interface StudentSectionDAOInterface {

    StudentSection getStudentSectionByStudentIDAndCRN(int studentID, int CRN) throws StudentSectionNotFoundException, DAOException;
    List<StudentSection> getStudentSectionsByStudentID(int studentID) throws StudentSectionNotFoundException, DAOException;
    List<StudentSection> getStudentSectionsByCRN(int CRN) throws StudentSectionNotFoundException, DAOException;

}
