package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import jakarta.inject.Singleton;
import studentmanagementsystem.Entities.Staff;
import studentmanagementsystem.exceptions.StaffNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.interfaces.DAOInterfaces.StaffDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class StaffDAO implements StaffDAOInterface {
    
    private Connection connection;

    public StaffDAO(Database database) {
        this.connection = database.getConnection();
    }

    @Override
    public Staff getStaffById(int id) throws StaffNotFoundException, DAOException {
        
        String query = "SELECT * FROM staff WHERE staffid = ?";

        try{
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            ResultSet result = statement.executeQuery();
            if(result.next()){
                return new Staff(
                    result.getInt("staffid"),
                    result.getString("fname"),
                    result.getString("lname"),
                    result.getBigDecimal("phone"),
                    result.getString("email"),
                    result.getString("passhash"),
                    result.getInt("depid"),
                    result.getString("token")
                );
            }else{
                throw new StaffNotFoundException("No staff found with id: " + id);
            }
        }catch(SQLException e){
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving staff with id: " + id, e);
        }
    }
}
