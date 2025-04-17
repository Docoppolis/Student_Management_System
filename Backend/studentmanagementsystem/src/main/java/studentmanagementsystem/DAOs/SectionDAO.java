package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import java.sql.ResultSet;
import jakarta.inject.Singleton;

import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.SectionNotFoundException;
import studentmanagementsystem.interfaces.DAOInterfaces.SectionDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class SectionDAO implements SectionDAOInterface{

    private Connection connection;

    public SectionDAO(Database database) {
        this.connection = database.getConnection();
    }

    @Override
    public Section getSectionByCRN(int crn) throws SectionNotFoundException, DAOException {
        
        String query = "SELECT * FROM sections WHERE crn = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, crn);
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                return new Section(
                    result.getInt("crn"), 
                    result.getInt("season"), 
                    result.getInt("year"), 
                    result.getInt("timeBlock"), 
                    result.getString("building"), 
                    result.getInt("room"), 
                    result.getString("coursePrefix"), 
                    result.getInt("courseNumber"), 
                    result.getInt("instructorID"), 
                    result.getInt("seats")
                );
            }else{
                throw new SectionNotFoundException("No section found with CRN: " + crn);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving section with CRN: " + crn, e);
        }
    }

    @Override
    public void updateInstructorID(int crn, Integer instructorID) throws SectionNotFoundException, DAOException {
        
        String query = "UPDATE sections SET instructorID = ? WHERE crn = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            if(instructorID == null){
                statement.setNull(1, java.sql.Types.INTEGER);
            }else{
                statement.setInt(1, instructorID);
            }
            statement.setInt(2, crn);
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected == 0) {
                throw new SectionNotFoundException("No section found with CRN: " + crn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while updating instructorID for section with CRN: " + crn, e);
        }
    }

    @Override
    public void addSection(Section section) throws DAOException
    {

        String query = "INSERT INTO sections (crn, season, year, timeBlock, building, room, coursePrefix, courseNumber, seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try{
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, section.getCrn());
            statement.setInt(2, section.getSeason());
            statement.setInt(3, section.getYear());
            statement.setInt(4, section.getTimeBlock());
            statement.setString(5, section.getBuilding());
            statement.setInt(6, section.getRoom());
            statement.setString(7, section.getCoursePrefix());
            statement.setInt(8, section.getCourseNumber());
            if(section.getInstructorID() == 0){
                statement.setNull(9, java.sql.Types.INTEGER);
            }else{
                statement.setInt(9, section.getInstructorID());
            }
            statement.setInt(10, section.getSeats());
            statement.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new DAOException("Database error occurred while adding section with CRN: " + section.getCrn(), e);
        }
    }

    @Override
    public List<Section> getSectionsByPrefixAndNumber(String prefix, int number) throws SectionNotFoundException, DAOException
    {

        List<Section> sections = new ArrayList<>();

        String query = "SELECT * FROM sections WHERE coursePrefix = ? AND courseNumber = ?";

        try{
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, prefix);
            statement.setInt(2, number);
            ResultSet result = statement.executeQuery();
            while(result.next()){
                sections.add(new Section(
                    result.getInt("crn"), 
                    result.getInt("season"), 
                    result.getInt("year"), 
                    result.getInt("timeBlock"), 
                    result.getString("building"), 
                    result.getInt("room"), 
                    result.getString("coursePrefix"), 
                    result.getInt("courseNumber"), 
                    result.getInt("instructorID"), 
                    result.getInt("seats")
                ));
            }
        }catch(SQLException e){
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving sections with prefix: " + prefix + " and number: " + number, e);
        }
        return sections;
    }
}