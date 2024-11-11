package studentmanagementsystem.controllers;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import studentmanagementsystem.Application;
import studentmanagementsystem.Authentication.UserRegistration;
import studentmanagementsystem.Authentication.UserLogin;

@Controller("/user")
public class UserController
{	
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
			PreparedStatement ps = Application.db.conn.prepareStatement("insert into users values (?, ?, null)");
			ps.setString(1, req.getEmail());
	    	Argon2 argon2 = Argon2Factory.create();
	    	String hash = argon2.hash(10, 65536, 1, req.getPassword().toCharArray());
			ps.setString(2, hash);
			ps.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return HttpResponse.ok(UserRegistrationReply(true));
	}
        @Post("/login")
        public HttpResponse<String> LoginUser(@Body UserLogin req)
        {
                try {
                        PreparedStatement ps = Application.db.conn.prepareStatement("select password from users where email = ?");
			ps.setString(1, req.getEmail());
                	ResultSet rs = ps.executeQuery();
			if (rs.next() && rs.getString("password").equals(req.getPassword()))
			{
				return HttpResponse.ok("{\"status\": \"success\", \"auth\":\"0x151\"}");
			}
                } catch (SQLException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                }
                return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid login\"}");
        }

}
