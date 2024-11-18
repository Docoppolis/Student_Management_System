package studentmanagementsystem.controllers;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.function.ObjIntConsumer;
import java.util.Map;
import java.util.HashMap;

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
import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.Entities.CourseProgress;

@Controller("/user/student")
public class StudentController
{	
	@Post("/schedule")
	public HttpResponse<Map<String, Object>> GetSchedule(@Body ValidateLogin req)
	//public HttpResponse<List<Section>> GetSchedule(Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...

			//Probable sql query to get schedule. Returns list of sections.
			/*List<Section> sections = new ArrayList<>();
			try
			{

				String query = 
				
					"SELECT " +
					"	c.Title, " +
					"	c.Prefix, " +
					"	c.Number, " +
					"	s.TimeBlock, " +
					"	s.Building, " +
					"	s.Room " +
					"FROM " +
					"	Enrollments e "+
					"JOIN " +
					"	Section s ON e.CRN = s.CRN " +
					"JOIN " +
					"	Course c ON s.Prefix = c.Prefix AND s.Number = c.Number " +
					"JOIN " +
					"	Student st ON e.StudentID = st.StudentID " +
					"WHERE " +
					"	st.StudentID = ? ";
				
				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				
				ps.setString(1, req.getEmail());
				ResultSet rs = ps.executeQuery();

				while(rs.next()){
					Section section = new Section();
					section.setCourseName(rs.getString("Title"));
					section.setCoursePrefix(rs.getString("Prefix"));
					section.setCourseNumber(rs.getInt("Number"));
					section.setTime(rs.getInt("TimeBlock"));
					section.setBuilding(rs.getString("Building"));
					section.setRoom(rs.getInt("Room"));

					sections.add(section);
				}
			}catch (SQLException e){
				e.printStackTrace();
				return HttpResponse.serverError("Database error occurred");
			}
			return HttpResponse.ok(sections);*/

			//REPLACE WITH SQL QUERY ABOVE WHEN DATABASE IS SET UP

			List<Section> sections = new ArrayList<Section>();
			Section one = new Section("Intro to Rocket League", "ROL", 1001, 1, "GAM", 101, 3, 15101);
			sections.add(one);
			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			response.put("0", one);
/* 			return HttpResponse.ok("""
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
			"""); */
			return HttpResponse.ok(response);
		}

		else if (usertype != UserType.INVALID)
		{
			Map<String, Object> response = new HashMap<>();
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}
		else
		{
			Map<String, Object> response = new HashMap<>();
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}
	}

	@Post("/progress")
	public HttpResponse<Map<String, Object>> GetDegreeProgress(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...

			List<CourseProgress> progress = new ArrayList<CourseProgress>();
			progress.add(new CourseProgress("ROL", 1001, 3, "F24", true));
			progress.add(new CourseProgress("SEB", 2000, 3, "F23", false));
			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			for (int i = 0; i < 2; i++)
				response.put(Integer.toString(i), progress.get(i));
			return HttpResponse.ok(response);
		}

		else if (usertype != UserType.INVALID)
		{
			Map<String, Object> response = new HashMap<>();
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}
		else
		{
			Map<String, Object> response = new HashMap<>();
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}
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

	@Post("/whatif")
	public HttpResponse<String> WhatIf(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			return HttpResponse.ok("""
		{
			"status":"success",
			"gpa":3.6,
			"credits":90
		}
		""");
		}

		else if (usertype != UserType.INVALID)
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid user type\"}");

		else
			return HttpResponse.ok("{\"status\": \"failure\", \"error\": \"invalid authorization\"}");
	}
}
