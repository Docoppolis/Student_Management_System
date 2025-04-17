package studentmanagementsystem.DAOs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.List;

import studentmanagementsystem.Entities.Major;
import studentmanagementsystem.exceptions.MajorNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.interfaces.DAOInterfaces.MajorsDAOInterface;
import studentmanagementsystem.Database;

@Singleton
public class MajorsDAO implements MajorsDAOInterface {

    private Connection connection;

    public MajorsDAO(Database database) {
        this.connection = database.getConnection();
    }

    @Override
    public Major getMajorByTitle(String title) throws MajorNotFoundException, DAOException {
        
        String query = "SELECT * FROM Majors WHERE title=?;";

        try{
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, title);
            ResultSet result = statement.executeQuery();
            if(result.next()){
                return new Major(
                    result.getInt("majorid"),
                    result.getString("title"),
                    result.getInt("credithours"),
                    result.getInt("depid")
                );
            }else{
                throw new MajorNotFoundException("No major found with title: " + title);
            }
        }catch(SQLException e){
            e.printStackTrace();
            throw new DAOException("Database error occurred while retrieving major with title: " + title, e);
        }
    }
}
