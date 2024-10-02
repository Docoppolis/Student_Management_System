package studentmanagementsystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class Database
{
	public Connection conn;
	
	public Database()
	{
		Properties props = new Properties();
		props.setProperty("user", "postgres");
		//props.setProperty("password", "dbpassword");
		try {
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", props);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
