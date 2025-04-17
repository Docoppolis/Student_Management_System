package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import jakarta.inject.Singleton;

import studentmanagementsystem.Entities.StudentSection;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.StudentSectionNotFoundException;
import studentmanagementsystem.interfaces.DAOInterfaces.StudentSectionDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class StudentSectionDAO implements StudentSectionDAOInterface{

    private Connection connection;

    public StudentSectionDAO(Database database) {
        this.connection = database.getConnection();
    }

    @Override
    public StudentSection getStudentSectionByStudentIDAndCRN(int studentID, int CRN) throws StudentSectionNotFoundException, DAOException {
        
        String query = "SELECT * FROM studentssections WHERE studentID = ? AND CRN = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, studentID);
            statement.setInt(2, CRN);
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                return new StudentSection(
                    result.getInt("studentID"), 
                    result.getInt("CRN"), 
                    result.getString("grade")
                );
            }else{
                throw new StudentSectionNotFoundException("No student section found with studentID: " + studentID + " and CRN: " + CRN);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving student section with studentID: " + studentID + " and CRN: " + CRN, e);
        }
    }

    @Override
    public List<StudentSection> getStudentSectionsByStudentID(int studentID) throws StudentSectionNotFoundException, DAOException {
        String query = "SELECT * FROM studentssections WHERE studentID = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, studentID);
            ResultSet result = statement.executeQuery();
            List<StudentSection> studentSections = new ArrayList<>();
            while (result.next()) {
                studentSections.add(new StudentSection(
                    result.getInt("studentID"), 
                    result.getInt("CRN"), 
                    result.getString("grade")
                ));
            }
            if (studentSections.size() == 0) {
                throw new StudentSectionNotFoundException("No student sections found with studentID: " + studentID);
            }
            return studentSections;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving student sections with studentID: " + studentID, e);
        }
    }

    @Override
    public List<StudentSection> getStudentSectionsByCRN(int CRN) throws StudentSectionNotFoundException, DAOException{
        String query = "SELECT * FROM studentssections WHERE CRN = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, CRN);
            ResultSet result = statement.executeQuery();
            List<StudentSection> studentSections = new ArrayList<>();
            while (result.next()) {
                studentSections.add(new StudentSection(
                    result.getInt("studentID"), 
                    result.getInt("CRN"), 
                    result.getString("grade")
                ));
            }
            if (studentSections.size() == 0) {
                throw new StudentSectionNotFoundException("No student sections found with CRN: " + CRN);
            }
            return studentSections;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving student sections with CRN: " + CRN, e);
        }
    }

}
