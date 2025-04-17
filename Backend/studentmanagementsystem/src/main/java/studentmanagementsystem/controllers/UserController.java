package studentmanagementsystem.controllers;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.UUID;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import studentmanagementsystem.Application;
import studentmanagementsystem.UserType;
import studentmanagementsystem.Authentication.UserRegistration;
import studentmanagementsystem.Authentication.UserLogin;
import studentmanagementsystem.Authentication.ValidateLogin;

@Controller("/user")
public class UserController
{	
	public static final Argon2 argon2 = Argon2Factory.create();
	
	public String UserRegistrationReply(boolean success)
	{
		String reply = "";
		if (success)
		{
			reply = "success";
		}
		else
			reply = "failed";
		return "{\"status\": \"%s\"}".format(reply);
	}
	
	@Post("/register")
	public HttpResponse<String> RegisterUser(@Body UserRegistration req)
	{
		try {
			PreparedStatement ps = Application.db.conn.prepareStatement("insert into users values (?, ?, ?, ?, ?)");
			ps.setString(1, req.getEmail());
	    	String hash = argon2.hash(10, 65536, 1, req.getPassword().toCharArray());
			ps.setString(2, hash);
			ps.setString(3, UUID.randomUUID().toString());
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return HttpResponse.ok("{\"status\":\"failure\"}");
		}
		return HttpResponse.ok(UserRegistrationReply(true));
	}

	@Post("/login")
	public HttpResponse<String> LoginUser(@Body UserLogin req)
	{
		String tables[] = {"students", "instructors", "advisors", "staff", "admins"};
		String idAttributes[] = {"studentid", "instructorid", "advisorid", "staffid", "adminid"};
		String idLetters[] = {"U", "I", "A", "S", "D"};
		try {
			for (int i = 0; i < 5; i++)
			{
				PreparedStatement ps = Application.db.conn.prepareStatement(String.format("select passhash, token, %s from %s where email = ?", idAttributes[i], tables[i]));
				ps.setString(1, req.getEmail());
				ResultSet rs = ps.executeQuery();
				if (rs.next() && argon2.verify(rs.getString("passhash"), req.getPassword()))
				{
					return HttpResponse.ok("{\"status\": \"success\", \"auth\":\"" + rs.getString("token") + "\", \"usertype\":" + i + ", \"id\":\"" + String.format("%s%s", idLetters[i], rs.getInt(idAttributes[i])) + "\"}");
				}
			}
		} 
		catch (SQLException e) {
				// TODO Auto-generated catch block
			e.printStackTrace();
			return HttpResponse.ok("{\"status\":\"failure\"}");
		}
		return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid login\"}");
	}

	public static int ValidateUserType(String auth, String id)
	{
		String tables[] = {"students", "instructors", "advisors", "staff", "admins"};
		String idAttributes[] = {"studentid", "instructorid", "advisorid", "staffid", "adminid"};
		int usertype = UserType.UserIDToType(id);
		int selectedTable = usertype;
		try {
			PreparedStatement ps = Application.db.conn.prepareStatement(String.format("select token from %s where %s = ?", tables[selectedTable], idAttributes[usertype]));
			ps.setInt(1, Integer.parseInt(id.substring(1)));
			ResultSet rs = ps.executeQuery();
			//System.out.println(id + " " + String.format("select token from %s where %s = %d", tables[selectedTable], idAttributes[usertype], Integer.parseInt(id.substring(1))));
			if (rs.next() && rs.getString("token").equals(auth))
			{
				return selectedTable;
			}
		}
		catch (SQLException e) {
				// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return UserType.INVALID;
	}

	@Post("/validate")
	public HttpResponse<String> ValidateUser(@Body ValidateLogin req)
	{
		int u = ValidateUserType(req.getAuth(), req.getId());
		if (u != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"success\", \"usertype\":" + u + "}");
		return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	}

}
