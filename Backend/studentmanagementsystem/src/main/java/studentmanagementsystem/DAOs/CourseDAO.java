package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.List;

import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.exceptions.CourseNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.interfaces.DAOInterfaces.CourseDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class CourseDAO implements CourseDAOInterface {

    private Connection connection;

    public CourseDAO(Database database) {
        this.connection = database.getConnection();
    }

    @Override
    public Course getCourseByPrefixAndNumber(String prefix, int number) throws CourseNotFoundException, DAOException {
        
        String query = "SELECT * FROM courses WHERE prefix = ? AND number = ?";

        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, prefix);
            statement.setInt(2, number);
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                return new Course(result.getString("prefix"), result.getInt("number"), result.getInt("creditHours"), result.getString("title"), result.getInt("depid"));
            }else{
                throw new CourseNotFoundException("No course found with prefix: " + prefix + " and number: " + number);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving course with prefix: " + prefix + " and number: " + number, e);
        }
    }

    @Override
    public void addCourse(Course course) throws DAOException {
        String query = "INSERT INTO courses (prefix, number, creditHours, title, depid) VALUES (?, ?, ?, ?, ?)";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, course.getPrefix());
            statement.setInt(2, course.getNumber());
            statement.setInt(3, course.getCreditHours());
            statement.setString(4, course.getTitle());
            statement.setInt(5, course.getDepartmentID());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while adding course with prefix: " + course.getPrefix() + " and number: " + course.getNumber(), e);
        }
    }

    @Override
    public List<Course> getCoursesByDepartment(int depid) throws DAOException {
        String query = "SELECT * FROM courses WHERE depid = ?";
        List<Course> courses = new ArrayList<>();
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, depid);
            ResultSet result = statement.executeQuery();
            while (result.next()) {
                courses.add(new Course(result.getString("prefix"), result.getInt("number"), result.getInt("creditHours"), result.getString("title"), result.getInt("depid")));
            }
            return courses;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving courses with department id: " + depid, e);
        }
    }

    @Override
    public void removeCourse(String prefix, int number) throws DAOException {
        String query = "DELETE FROM courses WHERE prefix = ? AND number = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, prefix);
            statement.setInt(2, number);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new DAOException("Database error occurred while removing course with prefix: " + prefix + " and number: " + number, e);
        }
    }
}
