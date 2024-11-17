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
import studentmanagementsystem.Authentication.ValidateLogin;
import studentmanagementsystem.Authentication.StudentRegistration;

@Controller("/user/student")
public class StudentController
{	
	@Post("/schedule")
	public HttpResponse<String> GetSchedule(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			return HttpResponse.ok("""
		{
			"status":"success",
			"0": {
				"title": "Intro to Rocket League",
				"code": "ROL1001",
				"time": "12:30 - 1:45 MW",
				"loc": "GAM101"
				},
			"1": {
				"title": "Intro to Trolling Seb",
				"code": "SEB2000",
				"time": "12:30 - 6:45 MWTHF",
				"loc": "BEB313"
				}
		}
			""");
		}

		else if (usertype != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid user type\"}");

		else
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	}

	@Post("/progress")
	public HttpResponse<String> GetDegreeProgress(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			return HttpResponse.ok("""
		{
			"status":"success",
			"0": {
				"code": "ROL1001",
				"credits":3,
				"term":"F24",
				"grade":"IP"
				},
			"1": {
				"code": "SEB2000",
				"credits":3,
				"term":"F24",
				"grade":"IP"
				}
		}
			""");
		}

		else if (usertype != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid user type\"}");

		else
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	}

	@Post("/register")
	public HttpResponse<String> Register(@Body StudentRegistration req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			return HttpResponse.ok("""
		{
			"status":"success",
			"0": {
				"crn": 32145,
				"status": "success",
				"message": "Course has successfully been added"
				},
			"1": {
				"crn": 22567,
				"status": "failure",
				"message": "Course has a time conflict with another course"
				},
			"2": {
				"crn": 78350,
				"status": "failure",
				"message": "Course is currently full"
				}
		}
		""");
		}

		else if (usertype != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid user type\"}");

		else
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	}

	@Post("/drop")
	public HttpResponse<String> Drop(@Body StudentRegistration req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			return HttpResponse.ok("""
		{
			"status":"success"
		}
		""");
		}

		else if (usertype != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid user type\"}");

		else
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	} 
}
