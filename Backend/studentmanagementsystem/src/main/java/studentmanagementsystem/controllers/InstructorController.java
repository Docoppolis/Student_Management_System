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
import studentmanagementsystem.Entities.*;

@Controller("/user/instructor")
public class InstructorController
{	
	@Post("/schedule")
	public HttpResponse<Map<String, Object>> GetSchedule(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.INSTRUCTOR)
		{
			List<ScheduleEntry> scheduleEntries = new ArrayList<ScheduleEntry>();
			try
			{
				String query = """
					SELECT 
						title,courseprefix,coursenumber,timeblock,building,room 
					FROM 
						sections 
					JOIN 
						courses on sections.courseprefix = courses.prefix AND sections.coursenumber = courses.number 
					WHERE 
						instructorid = ? and season = ? and year = ?;
				""";
				
				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ps.setInt(2, Application.current_sem);
				ps.setInt(3, Application.current_year);
				ResultSet rs = ps.executeQuery();

				while(rs.next()){
					scheduleEntries.add(
						new ScheduleEntry(
							rs.getString("title"), 
							rs.getString("building"), 
							rs.getInt("room"), 
							rs.getInt("timeblock"), 
							rs.getString("courseprefix"), 
							rs.getInt("coursenumber")
						)
					);
				}
			}catch (SQLException e){
				Map<String, Object> response = new HashMap<>();
				response.put("status", "Database error occurred");
				e.printStackTrace();
				return HttpResponse.serverError(response);
			}

			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			for (int i = 0; i < scheduleEntries.size(); i++)
				response.put(Integer.toString(i), scheduleEntries.get(i));
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

    @Post("/courses")
	public HttpResponse<Map<String, Object>> GetAllCourses(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.INSTRUCTOR)
		{
			List<InstructorCourseEntry> courses = new ArrayList<InstructorCourseEntry>(); 
			try {
				String query = """
					SELECT 
						season,
						year,
						courseprefix,
						coursenumber,
						title,
						credithours,
						ROUND(SUM(CASE 
								WHEN studentssections.grade = 'A' THEN 4
								WHEN studentssections.grade = 'B' THEN 3
								WHEN studentssections.grade = 'C' THEN 2
								WHEN studentssections.grade = 'D' THEN 1
								WHEN studentssections.grade = 'F' THEN 0
								ELSE NULL 
							END) * 1.0 / COUNT(studentssections.studentid), 2) AS average_grade
					FROM 
						sections 
					JOIN 
						courses 
						ON sections.courseprefix = courses.prefix AND sections.coursenumber = courses.number
					LEFT JOIN 
						studentssections 
						ON sections.crn = studentssections.crn
					WHERE 
						instructorid = ?
					GROUP BY 
						season, year, courseprefix, coursenumber, title, credithours;
						""";

					PreparedStatement ps = Application.db.conn.prepareStatement(query);
			
					ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
					ResultSet rs = ps.executeQuery();

					while(rs.next()) {
						// Check if the average_grade is null or not available
						double averageGrade = rs.getDouble("average_grade");
						boolean hasGrade = !rs.wasNull(); // Checks if the grade column is NULL
						
						// Determine the grade
						String letterGrade;
						if (!hasGrade) {
							letterGrade = "IP"; // In Progress when no average grade
						} else {
							// Round the numeric grade and convert to letter grade
							int numericGrade = (int) Math.round(averageGrade);
							switch (numericGrade) {
								case 4:
									letterGrade = "A";
									break;
								case 3:
									letterGrade = "B";
									break;
								case 2:
									letterGrade = "C";
									break;
								case 1:
									letterGrade = "D";
									break;
								case 0:
									letterGrade = "F";
									break;
								default:
									letterGrade = "N/A"; // Handle unexpected values
							}
						}
					
						// Add the course entry with the determined grade
						courses.add(
							new InstructorCourseEntry(
								rs.getString("courseprefix"), 
								rs.getInt("coursenumber"), 
								rs.getString("title"), 
								rs.getInt("credithours"), 
								letterGrade,  // Use the computed or default letter grade
								rs.getInt("year"), 
								rs.getInt("season")
							)
						);
					}					
			} catch (SQLException e) {
				Map<String, Object> response = new HashMap<>();
				e.printStackTrace();
				response.put("status", "failure");
				response.put("error", "Database error occurred");
				return HttpResponse.serverError(response); 
			}    
			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			for (int i = 0; i < courses.size(); i++)
				response.put(Integer.toString(i), courses.get(i));
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

}
