package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import jakarta.inject.Singleton;
import studentmanagementsystem.Entities.Instructor;
import studentmanagementsystem.exceptions.InstructorNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.interfaces.DAOInterfaces.InstructorDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class InstructorDAO implements InstructorDAOInterface {

    private Connection connection;

    public InstructorDAO(Database database) {
        this.connection = database.getConnection();
    }

    public Instructor getInstructorById(int id) throws InstructorNotFoundException, DAOException {
        
        String query = "SELECT * FROM instructors WHERE instructorid = ?";

        try{
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            ResultSet result = statement.executeQuery();
            if(result.next()){
                return new Instructor(
                    result.getInt("instructorid"),
                    result.getString("fname"),
                    result.getString("lname"),
                    result.getInt("phone"),
                    result.getString("email"),
                    result.getString("passhash"),
                    result.getInt("depid"),
                    result.getString("token")
                );
            }else{
                throw new InstructorNotFoundException("No instructor found with id: " + id);
            }
        }catch(SQLException e){
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving instructor with id: " + id, e);
        }
    }
}