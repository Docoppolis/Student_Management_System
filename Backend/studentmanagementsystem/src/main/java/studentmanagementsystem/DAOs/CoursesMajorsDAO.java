package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.List;

import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.interfaces.DAOInterfaces.CoursesMajorsDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class CoursesMajorsDAO implements CoursesMajorsDAOInterface {
    
    private Connection connection;

    public CoursesMajorsDAO(Database database) {
        this.connection = database.getConnection();
    }
    
    @Override
    public void addCourseToMajor(String coursePrefix, int courseNumber, int majorID) throws DAOException {
        String query = "INSERT INTO coursesmajors (prefix, number, majorid) VALUES (?, ?, ?)";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, coursePrefix);
            statement.setInt(2, courseNumber);
            statement.setInt(3, majorID);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while adding course with id: " + courseNumber + " to major with id: " + majorID, e);
        }
    }

}
