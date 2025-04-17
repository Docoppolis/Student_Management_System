package studentmanagementsystem.controllers;

import java.lang.reflect.Array;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.function.ObjIntConsumer;
import java.util.Map;
import java.util.HashMap;
import jakarta.inject.Inject;

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
import studentmanagementsystem.Entities.*;
import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.services.DisplayService;
import studentmanagementsystem.DAOs.*;

@Controller("/user/student")
public class StudentController
{	

	//Services to be used by controller
	private final DisplayService displayService;

	//Constructor
	public StudentController(DisplayService displayService)
	{
		this.displayService = displayService;
	}

	@Post("/schedule")
	public HttpResponse<Map<String, Object>> GetSchedule(@Body ValidateLogin req)
	{
		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
		{
			try{
				int studentID = Integer.parseInt(req.getId().substring(1));
				List<ScheduleEntry> schedule = displayService.getStudentSchedule(studentID);
				response.put("status", "success");
				for(int i = 0; i < schedule.size(); i++){
					response.put(Integer.toString(i), schedule.get(i));
				}

			}catch(ServiceException e){
				response.put("status", "failure");
				response.put("error", "Error occurred while retrieving student schedule");
			}
			return HttpResponse.ok(response);

		}else if (usertype != UserType.INVALID)
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

	/*@Post("/schedule")
	public HttpResponse<Map<String, Object>> GetSchedule(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
		{


			List<ScheduleEntry> scheduleEntries = new ArrayList<ScheduleEntry>();
			try
			{
				String query = """
					SELECT 
						Title, Prefix, Number, TimeBlock, Building, Room
					FROM 
						Courses C 
					JOIN 
						Sections S ON C.Prefix = S.CoursePrefix AND C.Number = S.CourseNumber
					JOIN 
						StudentsSections SS ON S.CRN = SS.CRN
					WHERE 
						SS.StudentID = ?
						AND S.year = ?
						AND S.season = ?
					ORDER BY TimeBlock;
					""";

				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ps.setInt(2, Application.current_year);
				ps.setInt(3, Application.current_sem);
				ResultSet rs = ps.executeQuery();

				while(rs.next()){
					ScheduleEntry scheduleEntry = new ScheduleEntry(
						rs.getString("Title"),
						rs.getString("Building"),
						rs.getInt("Room"),
						rs.getInt("TimeBlock"),
						rs.getString("Prefix"),
						rs.getInt("Number")
						);

					scheduleEntries.add(scheduleEntry);
				}
			}catch (SQLException e){
				e.printStackTrace();
				Map<String, Object> response = new HashMap<>();
				response.put("status", "failure");
				response.put("error", "Database error occured");
				return HttpResponse.serverError(response);
			}

			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			for(int i = 0; i < scheduleEntries.size(); i++){
				response.put(Integer.toString(i), scheduleEntries.get(i));
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
	}*/

	@Post("/progress")
	public HttpResponse<Map<String, Object>> GetDegreeProgress(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...
			
			int majorCreditHours;
			List<CourseProgress> progress = new ArrayList<CourseProgress>();
			try
			{

				String tableQuery = """
				SELECT
					c.Prefix AS coursePrefix,
					c.Number AS courseNumber,
					c.CreditHours AS credits,
					CONCAT(s.Season, s.Year) AS term,
					CASE
						WHEN ss.Grade IS NULL THEN true
						ELSE false
					END AS inProgress,
					ss.Grade AS grade
				FROM
					StudentsSections ss
				JOIN
					Students st ON ss.StudentID = st.StudentID
				JOIN
					Sections s ON ss.CRN = s.CRN
				JOIN
					Courses c ON s.CoursePrefix = c.Prefix AND s.CourseNumber = c.Number
				WHERE
					st.studentid = ?;
				""";

				int StudentID = Integer.parseInt((req.getId().substring(1)));
				PreparedStatement tablePs = Application.db.conn.prepareStatement(tableQuery);
				tablePs.setInt(1, StudentID);
				ResultSet tableRs = tablePs.executeQuery();

				int totalCompletedCredits = 0; // To track the total credits of completed courses

				while(tableRs.next())
				{
					//Sets grade to 'IP' if class is incomplete
					String grade;
					if(tableRs.getString("grade") == null){
						grade = "IP";
					}else{
						grade = tableRs.getString("grade");
						// Increment totalCompletedCredits if the course is completed
						if (!grade.equals("IP")) {
							totalCompletedCredits += tableRs.getInt("credits");
						}
					}
					CourseProgress courseProgress = new CourseProgress(
						tableRs.getString("coursePrefix"),
						tableRs.getInt("courseNumber"),
						tableRs.getInt("credits"),
						tableRs.getInt("term"),
						tableRs.getBoolean("inProgress"),
						grade
					);

					progress.add(courseProgress);
				}

				String headerQuery = """
					SELECT 
						m.CreditHours AS requiredCreditHours
					FROM 
						Students s
					JOIN 
						Majors m ON s.MajorID = m.MajorID
					WHERE 
						s.StudentID = ?;
				""";

				PreparedStatement headerPs = Application.db.conn.prepareStatement(headerQuery);
				headerPs.setInt(1, StudentID);
				ResultSet headerRs = headerPs.executeQuery();

				if(headerRs.next()){
					majorCreditHours = headerRs.getInt("requiredCreditHours");
				}else{
					Map<String, Object> response = new HashMap<>();
					response.put("status", "failure");
					//response.put("error", "No major found for the student");
					return HttpResponse.ok(response);
				}

				Map<String, Object> response = new HashMap<>();
				response.put("status", "success");
				for(int i = 0; i < progress.size(); i++){
					response.put(Integer.toString(i), progress.get(i));
				}

				//Calculate average GPA from letter grades
				float gpa = 0;
				int totalCreditsCompleted = 0;
				for(int i = 0; i < progress.size(); i++){
					switch(progress.get(i).getGrade()){
						case "A":
							gpa = gpa + 4 * progress.get(i).getCredits();
							totalCreditsCompleted += progress.get(i).getCredits();
							break;
						case "B":
							gpa = gpa + 3 * progress.get(i).getCredits();
							totalCreditsCompleted += progress.get(i).getCredits();
							break;
						case "C":
							gpa = gpa + 2 * progress.get(i).getCredits();
							totalCreditsCompleted += progress.get(i).getCredits();
							break;
						case "D":
							gpa = gpa + 1 * progress.get(i).getCredits();
							totalCreditsCompleted += progress.get(i).getCredits();
							break;
						case "F":
							gpa = gpa + 0;
							totalCreditsCompleted += progress.get(i).getCredits();
							break;
						default:
							continue;
					}
				}
				if(totalCreditsCompleted > 0){
					gpa = gpa/totalCreditsCompleted;
				}else{
					gpa = 0;
				}


				//response.put("status", "success");
				response.put("credithours", majorCreditHours);
				response.put("gpa", gpa);
				for (int i = 0; i < progress.size(); i++){
					response.put(Integer.toString(i), progress.get(i));
				}

				System.out.println("GPA: ");
				System.out.println(gpa);

				// Add appropriate message
				if (totalCompletedCredits >= majorCreditHours) {
					response.put("message", "Congratulations! You have completed the required credits for your major.");
				}

				return HttpResponse.ok(response);

			}catch (SQLException e){
				e.printStackTrace();
				Map<String, Object> response = new HashMap<>();
				response.put("status", "failure");
				response.put("error", "Database error occured");
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

	@Post("/registration")
	public HttpResponse<Map<String, Object>> GetCurrentRegistration(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
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

					futureSections.add(section);
				}

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
	public HttpResponse<Map<String, Object>> AddSection(@Body StudentRegistration req)
	{
		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
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
				int studentID = Integer.parseInt((req.getId().substring(1)));

				for(Integer CRN : CRNs){

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
	
					if (!sectionResult.next() || sectionResult.getInt(1) == 0) {
						// Section does not exist
						failedToRegister.add(CRN);
						continue;
					}

					//Checks for available seats
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

					//Adds student to section if there are available seats
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
	public HttpResponse<Map<String, Object>> Drop(@Body StudentRegistration req)
	{
		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
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

				int studentID = Integer.parseInt((req.getId().substring(1)));
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
							successfullyDropped.add(CRN);
						}else{
							failedToDrop.add(CRN);
						}
					}
				}
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

	@Post("/whatif")
	public HttpResponse<Map<String, Object>> WhatIf(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
		{
			//PreparedStatement sc = Application.db.conn.prepareStatement("select ");
			//do sql stuff...

			String query = """
			WITH CompletedCredits AS (
				SELECT
					SUM(c.CreditHours) AS TotalCompleted
				FROM
					StudentsSections ss
				JOIN Sections s ON ss.CRN = s.CRN
				JOIN Courses c ON s.CoursePrefix = c.Prefix AND s.CourseNumber = c.Number
				WHERE
					ss.StudentID = ? AND ss.Grade IS NOT NULL
			)
			SELECT
				TotalCompleted
			FROM
				CompletedCredits;
				""";
			
			try
			{
				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();

				rs.next();
				Map<String, Object> response = new HashMap<>();
				response.put("status", "success");
				response.put("credits", rs.getInt("TotalCompleted"));

				String tableQuery = """
				SELECT
					c.CreditHours AS credits,
					CASE
						WHEN ss.Grade IS NULL THEN true
						ELSE false
					END AS inProgress,
					ss.Grade AS grade
				FROM
					StudentsSections ss
				JOIN
					Students st ON ss.StudentID = st.StudentID
				JOIN
					Sections s ON ss.CRN = s.CRN
				JOIN
					Courses c ON s.CoursePrefix = c.Prefix AND s.CourseNumber = c.Number
				WHERE
					st.studentid = ?;
				""";

				int StudentID = Integer.parseInt((req.getId().substring(1)));
				PreparedStatement tablePs = Application.db.conn.prepareStatement(tableQuery);
				tablePs.setInt(1, StudentID);
				ResultSet tableRs = tablePs.executeQuery();
				
				//Calculate average GPA from letter grades
				float gpaPoints = 0;
				int totalCreditsTaken = 0;

				while(tableRs.next())
				{
					if (!tableRs.getBoolean("inProgress"))
					{
						switch(tableRs.getString("grade")){
							case "A":
								gpaPoints = gpaPoints + 4 * tableRs.getInt("credits");
								totalCreditsTaken += tableRs.getInt("credits");
								break;
							case "B":
								gpaPoints = gpaPoints + 3 * tableRs.getInt("credits");
								totalCreditsTaken += tableRs.getInt("credits");
								break;
							case "C":
								gpaPoints = gpaPoints + 2 * tableRs.getInt("credits");
								totalCreditsTaken += tableRs.getInt("credits");
								break;
							case "D":
								gpaPoints = gpaPoints + 1 * tableRs.getInt("credits");
								totalCreditsTaken += tableRs.getInt("credits");
								break;
							case "F":
								gpaPoints = gpaPoints + 0;
								totalCreditsTaken += tableRs.getInt("credits");
								break;
							default:
								break;
						}
					} 
				}
				response.put("gpa", gpaPoints/totalCreditsTaken);
				return HttpResponse.ok(response);
			}
			catch (SQLException e)
			{
				e.printStackTrace();
				Map<String, Object> response = new HashMap<>();
				response.put("status", "failure");
				response.put("error", "Database error occured");
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

	@Post("/courses")
	public HttpResponse<Map<String, Object>> GetCourses(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STUDENT)
		{
			Map<String, Object> response = new HashMap<>();
			response.put("status", "success");
			List<CourseEntry> courseEntries = new ArrayList<>();
			
			try
			{

				String query = """
					SELECT
						c.title AS courseName,
						s.building AS building,
						s.room AS room,
						s.timeblock AS time,
						c.prefix AS coursePrefix,
						c.number AS courseNumber,
						(SELECT COUNT(*) FROM studentssections ss WHERE ss.crn = s.crn) AS seats,
						s.seats AS maxSeats,
						CONCAT(s.season, ' ', s.year) AS term,
						(i.fname || ' ' || i.lname) AS instructor,
						c.credithours AS credits,
						s.crn AS crn
					FROM
						sections s
					JOIN
						courses c ON s.courseprefix = c.prefix AND s.coursenumber = c.number
					LEFT JOIN
						instructors i ON s.instructorid = i.instructorid
					JOIN
						coursesmajors cm ON c.prefix = cm.prefix AND c.number = cm.number
					JOIN
						students st ON st.studentid = ?
					JOIN
						majors m ON st.majorid = m.majorid AND cm.majorid = m.majorid;
						""";

				PreparedStatement ps = Application.db.conn.prepareStatement(query);
				int StudentID = Integer.parseInt((req.getId().substring(1)));
				ps.setInt(1, StudentID);

				ResultSet rs = ps.executeQuery();

				while(rs.next())
				{

					CourseEntry course = new CourseEntry(
						rs.getString("courseName"),
						rs.getString("building"),
						rs.getInt("room"),
						rs.getInt("time"),
						rs.getString("coursePrefix"),
						rs.getInt("courseNumber"),
						rs.getInt("seats"),
						rs.getInt("maxSeats"),
						rs.getString("term"),
						rs.getString("instructor"),
						rs.getInt("credits"),
						rs.getInt("crn")
					);

					courseEntries.add(course);

				}
			}catch(SQLException e){
				e.printStackTrace();
			}
			for (int i = 0; i < courseEntries.size(); i++)
				response.put(Integer.toString(i), courseEntries.get(i));
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
