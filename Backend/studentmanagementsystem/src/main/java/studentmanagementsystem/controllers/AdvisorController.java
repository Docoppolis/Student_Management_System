package studentmanagementsystem.controllers;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
import studentmanagementsystem.Authentication.AdvisorRegistration;
import studentmanagementsystem.Authentication.AdvisorWhatIf;
import studentmanagementsystem.Entities.*;

@Controller("/user/advisor")
public class AdvisorController
{	

	@Post("/registration")
	public HttpResponse<Map<String, Object>> GetCurrentRegistration(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		System.out.println("usertype: " + usertype);
		if (usertype == UserType.ADVISOR)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...

			Map<String, Object> response = new HashMap<>();
			try
			{

				List<FutureSection> futureSections = new ArrayList<FutureSection>();

				String query = """
					WITH TargetSemesters AS (
						SELECT
							CASE
								WHEN ? + 1 > 3 THEN ? + 1 -- Increment year if season wraps
								ELSE ?
							END AS nextYear1,
							CASE
								WHEN ? + 1 > 3 THEN (? + 1) % 3 -- Wrap around season
								ELSE ? + 1
							END AS nextSeason1,
							CASE
								WHEN ? + 2 > 3 THEN ? + 1 -- Increment year if season wraps
								ELSE ?
							END AS nextYear2,
							CASE
								WHEN ? + 2 > 3 THEN (? + 2) % 3 -- Wrap around season
								ELSE ? + 2
							END AS nextSeason2
					)
					SELECT DISTINCT
						c.number AS courseNumber,
						c.prefix AS coursePrefix,
						c.title AS courseTitle,
						c.credithours AS credits,
						s.crn AS sectionCRN,
						s.season AS season,
						s.year AS year,
						s.season || ' ' || s.year AS term
					FROM
						studentssections ss
					JOIN sections s ON ss.crn = s.crn
					JOIN courses c ON s.courseprefix = c.prefix AND s.coursenumber = c.number
					JOIN TargetSemesters t ON
						(s.season = t.nextSeason1 AND s.year = t.nextYear1) OR
						(s.season = t.nextSeason2 AND s.year = t.nextYear2) OR
						(s.season = ? AND s.year = ?)
					WHERE
						ss.studentid = ?;

					""";

				int studentID = Integer.parseInt((req.getId().substring(1)));
				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				ps.setInt(1, Application.current_sem); 
				ps.setInt(2, Application.current_year); 
				ps.setInt(3, Application.current_year); 
				ps.setInt(4, Application.current_sem);
				ps.setInt(5, Application.current_sem);
				ps.setInt(6, Application.current_sem);
				ps.setInt(7, Application.current_sem);
				ps.setInt(8, Application.current_year);
				ps.setInt(9, Application.current_year);
				ps.setInt(10, Application.current_sem);
				ps.setInt(11, Application.current_sem);
				ps.setInt(12, Application.current_sem);
				ps.setInt(13, Application.current_sem); 
				ps.setInt(14, Application.current_year); 
				ps.setInt(15, studentID); 
				ResultSet rs = ps.executeQuery();

				System.out.println("Result Set:");
				while(rs.next())
				{
					System.out.println("CRN: " + rs.getInt("sectionCRN"));
					System.out.println("Course Title: " + rs.getString("courseTitle"));
					FutureSection section = new FutureSection(
						rs.getString("coursePrefix"),
						rs.getInt("courseNumber"),
						rs.getString("courseTitle"),
						rs.getInt("credits"),
						rs.getInt("sectionCRN"),
						rs.getString("term")
					);

					System.out.println("Term:");
					System.out.println(section.getTerm());
					futureSections.add(section);
				}

				System.out.println("Term:");
				
				response.put("status", "success");
				for(int i = 0; i < futureSections.size(); i++){
					response.put(Integer.toString(i), futureSections.get(i));
				}
				return HttpResponse.ok(response);
				
			}catch(SQLException e){
				e.printStackTrace();
				response.put("status", "failure");
				response.put("message", "Database error occurred");
				return HttpResponse.serverError(response);
			}
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

	@Post("/registration/add")
	public HttpResponse<Map<String, Object>> Register(@Body AdvisorRegistration req)
	{

		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.ADVISOR)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...

			List<Integer> CRNs = new ArrayList<Integer>();
			CRNs.add(req.getCrn0());
			CRNs.add(req.getCrn1());
			CRNs.add(req.getCrn2());
			CRNs.add(req.getCrn3());
			CRNs.add(req.getCrn4());
			CRNs.add(req.getCrn5());
			List<Integer> successfullyRegistered = new ArrayList<>();
			List<Integer> failedToRegister = new ArrayList<>();

			try
			{
				int studentID = Integer.parseInt((req.getUid().substring(1)));
				int advisorID = Integer.parseInt(req.getId().substring(1));

				//Returns the student department and the advisor department
				String checkStudentDepartmentQuery= """
					SELECT 
						m.DepID AS studentDepartmentID,
						a.DepID AS advisorDepartmentID
					FROM 
						Students st
					JOIN 
						Majors m ON st.MajorID = m.MajorID
					JOIN 
						Advisors a ON a.AdvisorID = ?
					WHERE 
						st.StudentID = ?;
				""";

				PreparedStatement checkStudentDepartmentStatement = Application.db.conn.prepareStatement(checkStudentDepartmentQuery);
				checkStudentDepartmentStatement.setInt(1, advisorID);
				checkStudentDepartmentStatement.setInt(2, studentID);
				ResultSet checkStudentDepartmentResult = checkStudentDepartmentStatement.executeQuery();

				//Check if student is in the same department as the advisor
				if(checkStudentDepartmentResult.next() && checkStudentDepartmentResult.getInt("studentDepartmentID") != checkStudentDepartmentResult.getInt("advisorDepartmentID"))
				{
					response.put("status", "failure");
					return HttpResponse.ok(response);
				}

				for(Integer CRN : CRNs)
				{

					if(CRN == 0){
						continue;
					}

					// Check if the section exists
					String checkSectionQuery = """
						SELECT COUNT(*)
						FROM Sections
						WHERE CRN = ?;
					""";

					PreparedStatement checkSectionStatement = Application.db.conn.prepareStatement(checkSectionQuery);
					checkSectionStatement.setInt(1, CRN);
					ResultSet sectionResult = checkSectionStatement.executeQuery();

					//Section does not exist
					if(!sectionResult.next() || sectionResult.getInt(1) == 0){
						failedToRegister.add(CRN);
						continue;
					}

					//Returns the department of the course, the major of the course, the major of the student, and the department of the advisor
					String checkDepartment = """
							SELECT 
								c.DepID AS courseDepartment, 
								cm.MajorID AS courseMajor, 
								st.MajorID AS studentMajor, 
								a.DepID AS advisorDepartment
							FROM 
								Sections sec
							JOIN 
								Courses c ON sec.CoursePrefix = c.Prefix AND sec.CourseNumber = c.Number
							JOIN 
								CoursesMajors cm ON c.Prefix = cm.Prefix AND c.Number = cm.Number
							JOIN 
								Students st ON st.StudentID = ?
							JOIN 
								Advisors a ON a.AdvisorID = ?
							WHERE 
								sec.CRN = ?;
						""";

					PreparedStatement checkDepartmentStatement = Application.db.conn.prepareStatement(checkDepartment);
					checkDepartmentStatement.setInt(1, studentID);
					checkDepartmentStatement.setInt(2, advisorID);
					checkDepartmentStatement.setInt(3, CRN);
					ResultSet checkDepartmentResult = checkDepartmentStatement.executeQuery();

					//Check if student is in the same major as the course is a part of and that the advisor is part of the course's department
					if(checkDepartmentResult.next() && checkDepartmentResult.getInt("courseDepartment") != checkDepartmentResult.getInt("advisorDepartment") && checkDepartmentResult.getInt("courseMajor") != checkDepartmentResult.getInt("studentMajor"))
					{
						failedToRegister.add(CRN);
						continue;
					}

					//Returns the seats available in the section
					String checkSeatsQuery = """
						SELECT
							(s.Seats - COUNT(ss.StudentID)) AS AvailableSeats
						FROM
							Sections s
						LEFT JOIN
							StudentsSections ss ON s.CRN = ss.CRN
						WHERE
							s.CRN = ?
						GROUP BY
							s.Seats;
					""";

					PreparedStatement checkSeatsStatement = Application.db.conn.prepareStatement(checkSeatsQuery);
					checkSeatsStatement.setInt(1, CRN);
					ResultSet checkSeatsResult = checkSeatsStatement.executeQuery();

					if(checkSeatsResult.next() && checkSeatsResult.getInt("AvailableSeats") > 0)
					{

						//Adds class registration to database
						String registerQuery = """
							INSERT INTO StudentsSections (StudentID, CRN, Grade)
							Values (?, ?, NULL);
							""";

						PreparedStatement registerStatement = Application.db.conn.prepareStatement(registerQuery);
						registerStatement.setInt(1, studentID);
						registerStatement.setInt(2, CRN);

						//Checks how many classes were registered for, adding the CRNs to either success or fail lists
						int rowsAffected = registerStatement.executeUpdate();
						if(rowsAffected > 0)
						{
							successfullyRegistered.add(CRN);
						}else{
							failedToRegister.add(CRN);
						}

					}else{
						failedToRegister.add(CRN);
					}
				}

				List<Map<String, Object>> crnResponses = new ArrayList<>();
				for (int i : successfullyRegistered)
				{
					Map<String, Object> data = new HashMap<>();
					data.put("message", "successfully registered");
					data.put("crn", i);
					crnResponses.add(data);
				}
				for (int i : failedToRegister)
				{
					Map<String, Object> data = new HashMap<>();
					data.put("message", "failed to register");
					data.put("crn", i);
					crnResponses.add(data);
				}
				response.put("status", "success");
				for (int i = 0; i < crnResponses.size(); i++)
					response.put(Integer.toString(i), crnResponses.get(i));
				return HttpResponse.ok(response);

			}catch(SQLException e){
				e.printStackTrace();
				response.put("status", "failure");
				response.put("message", "Database error occurred");
				return HttpResponse.serverError(response);
			}

		}
		else if (usertype != UserType.INVALID)
		{
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}
		else
		{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}

		
	}

	@Post("/registration/drop")
	public HttpResponse<Map<String, Object>> Drop(@Body AdvisorRegistration req)
	{
		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.ADVISOR)
		{

			List<Integer> CRNs = new ArrayList<Integer>();
			CRNs.add(req.getCrn0());
			CRNs.add(req.getCrn1());
			CRNs.add(req.getCrn2());
			CRNs.add(req.getCrn3());
			CRNs.add(req.getCrn4());
			CRNs.add(req.getCrn5());
			
			List<Integer> successfullyDropped = new ArrayList<>();
			List<Integer> failedToDrop = new ArrayList<>();

			try
			{
				int studentID = Integer.parseInt((req.getUid().substring(1)));
				int advisorID = Integer.parseInt(req.getId().substring(1));

				//Returns the student department and the advisor department
				String checkStudentDepartmentQuery= """
					SELECT 
						m.DepID AS studentDepartmentID,
						a.DepID AS advisorDepartmentID
					FROM 
						Students st
					JOIN 
						Majors m ON st.MajorID = m.MajorID
					JOIN 
						Advisors a ON a.AdvisorID = ?
					WHERE 
						st.StudentID = ?;
				""";

				PreparedStatement checkStudentDepartmentStatement = Application.db.conn.prepareStatement(checkStudentDepartmentQuery);
				checkStudentDepartmentStatement.setInt(1, advisorID);
				checkStudentDepartmentStatement.setInt(2, studentID);
				ResultSet checkStudentDepartmentResult = checkStudentDepartmentStatement.executeQuery();

				//Check if student is in the same department as the advisor
				if(checkStudentDepartmentResult.next() && checkStudentDepartmentResult.getInt("studentDepartmentID") != checkStudentDepartmentResult.getInt("advisorDepartmentID"))
				{
					response.put("status", "failure");
					return HttpResponse.ok(response);
				}
				
				for (Integer CRN : CRNs)
				{

					if(CRN == 0){
						continue;
					}

					//Check if currently registered
					String checkRegistrationQuery = """
							SELECT 
								COUNT(*)
							FROM
								StudentsSections
							WHERE
								StudentID = ? AND CRN = ?;
					""";
					
					PreparedStatement checkRegistrationStatement = Application.db.conn.prepareStatement(checkRegistrationQuery);
					checkRegistrationStatement.setInt(1, studentID);
					checkRegistrationStatement.setInt(2, CRN);
					ResultSet checkResult = checkRegistrationStatement.executeQuery();

					if(checkResult.next() && checkResult.getInt(1) > 0)
					{
						//Query to drop class
						String dropQuery = """
								DELETE FROM
									StudentsSections
								WHERE
									StudentID = ? AND CRN = ?;
							""";

						PreparedStatement dropStatement = Application.db.conn.prepareStatement(dropQuery);
						dropStatement.setInt(1, studentID);
						dropStatement.setInt(2, CRN);

						int rowsAffected = dropStatement.executeUpdate();
						if(rowsAffected > 0){
							failedToDrop.add(CRN);
						}else{
							successfullyDropped.add(CRN);
						}
					}
				}
				response.put("status", "success");
				List<Map<String, Object>> crnResponses = new ArrayList<>();
				for (int i : successfullyDropped)
				{
					Map<String, Object> data = new HashMap<>();
					data.put("message", "successfully dropped");
					data.put("crn", i);
					crnResponses.add(data);
				}
				for (int i : failedToDrop)
				{
					Map<String, Object> data = new HashMap<>();
					data.put("message", "failed to drop");
					data.put("crn", i);
					crnResponses.add(data);
				}
				response.put("status", "success");
				for (int i = 0; i < crnResponses.size(); i++)
					response.put(Integer.toString(i), crnResponses.get(i));
				return HttpResponse.ok(response);


			}catch(SQLException e){
				e.printStackTrace();
				response.put("status", "failure");
				response.put("error", "Database error occurred");
				return HttpResponse.serverError(response); 
			}

		}

		else if (usertype != UserType.INVALID)
		{
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}
		else
		{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}
	}

	//SQL query for student info, still needs GPA and credits from DB
	@Post("/whatif")
	public HttpResponse<Map<String, Object>> WhatIf(@Body AdvisorWhatIf req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.ADVISOR)
		{
			Map<String, Object> response = new HashMap<>();
			try {
				PreparedStatement ps = Application.db.conn.prepareStatement("select fname,lname,title from students join majors on students.majorid = majors.majorid where studentid = ?;");
				ps.setInt(1, Integer.parseInt(req.getUid().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();
				response.put("name", rs.getString("fname") + " " + rs.getString("lname"));
				response.put("major", rs.getString("title"));
				response.put("maxcredits", 120);
				response.put("status", "success");
				response.put("gpa", 3.6);
				response.put("credits", 90);
				return HttpResponse.ok(response);
			}
			catch (SQLException e)
			{
				e.printStackTrace();
				response.put("status", "failure");
				response.put("error", "Database error");
				return HttpResponse.ok(response);
			}
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

	@Post("/student/courses")
	public HttpResponse<Map<String, Object>> GetDegreeProgress(@Body AdvisorWhatIf req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.ADVISOR)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			response.put("gpa", 3.6);
			response.put("credits", 90);
			response.put("name", "Greggy Heff");
			response.put("gender", "Male");
			response.put("major", "CSE");
			response.put("maxcredits", 120);
			List<DegreeEntry> entries = new ArrayList<DegreeEntry>();
			entries.add(new DegreeEntry(4362, "COP", 3, 2024, 3, "IP"));
			entries.add(new DegreeEntry(4020, "CEN", 4, 2023, 3, "A"));
			for (int i = 0; i < entries.size(); i++)
				response.put(Integer.toString(i), entries.get(i));
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

	//TODO: MAKE SURE QUERY WORKS
	@Post("/courses")
	public HttpResponse<Map<String, Object>> GetCourses(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.ADVISOR)
		{
			

			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			List<CourseEntry> courseEntries = new ArrayList<>();
			
			int advisorID = Integer.parseInt(req.getId().substring(1));
			try
			{

				String query = """
					SELECT 
						c.Prefix AS coursePrefix,
						c.Number AS courseNumber,
						c.Title AS courseTitle,
						c.CreditHours AS credits,
						s.TimeBlock AS time,
						i.Fname || ' ' || i.Lname AS instructor,
						s.Seats AS maxSeats,
						COUNT(ss.StudentID) AS seatsFilled, -- Renamed column to seatsFilled
						s.Season || ' ' || s.Year AS term,
						s.CRN AS crn,
						s.Building AS building,
						s.Room AS room
					FROM 
						Sections s
					JOIN 
						Courses c ON s.CoursePrefix = c.Prefix AND s.CourseNumber = c.Number
					LEFT JOIN 
						StudentsSections ss ON s.CRN = ss.CRN -- Count students from StudentsSections
					JOIN 
						Instructors i ON s.InstructorID = i.InstructorID
					JOIN 
						Departments d ON c.DepID = d.DepID
					JOIN 
						Advisors a ON d.DepID = a.DepID
					WHERE 
						a.AdvisorID = ?
					GROUP BY 
						c.Prefix, 
						c.Number, 
						c.Title, 
						c.CreditHours, 
						s.TimeBlock, 
						i.Fname, 
						i.Lname, 
						s.Seats, 
						s.Season, 
						s.Year, 
						s.CRN, 
						s.Building, 
						s.Room;
				""";

				System.out.println("Advisor ID: " + advisorID);
				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				ps.setInt(1, advisorID);
				ResultSet rs = ps.executeQuery();

				while(rs.next())
				{

					CourseEntry course = new CourseEntry(
						rs.getString("courseTitle"),
						rs.getString("building"),
						rs.getInt("room"),
						rs.getInt("time"),
						rs.getString("coursePrefix"),
						rs.getInt("courseNumber"),
						rs.getInt("seatsFilled"),
						rs.getInt("maxSeats"),
						rs.getString("term"),
						rs.getString("instructor"),
						rs.getInt("credits"),
						rs.getInt("crn")
					);

					courseEntries.add(course); 

				}
			}	catch(SQLException e){
				response.put("status", "failure");
				e.printStackTrace();
			}
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
