package studentmanagementsystem.interfaces.DAOInterfaces;

import java.sql.SQLException;
import java.util.List;

import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.SectionNotFoundException;

public interface SectionDAOInterface {

    Section getSectionByCRN(int crn) throws SectionNotFoundException, DAOException;
    void updateInstructorID(int crn, Integer instructorID) throws SectionNotFoundException, DAOException;
    void addSection(Section section) throws DAOException;
    List<Section> getSectionsByPrefixAndNumber(String prefix, int number) throws SectionNotFoundException, DAOException;

}
