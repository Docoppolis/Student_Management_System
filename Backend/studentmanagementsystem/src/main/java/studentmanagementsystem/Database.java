package studentmanagementsystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import jakarta.inject.Singleton;

@Singleton
public class Database
{
	public Connection conn;
	
	public Database()
	{
		Properties props = new Properties();
		props.setProperty("user", "project");
		//props.setProperty("password", "dbpassword");
		try {
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/project", props);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Connection getConnection() {
		return conn;
	}

}
