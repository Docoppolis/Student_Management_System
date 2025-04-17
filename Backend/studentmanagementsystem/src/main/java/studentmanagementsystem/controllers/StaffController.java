package studentmanagementsystem.controllers;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import DTOs.StaffSectionsEntryDTO;

import java.util.Map;
import java.util.HashMap;
import java.util.Random;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import studentmanagementsystem.Application;
import studentmanagementsystem.UserType;
import studentmanagementsystem.Authentication.ValidateLogin;
import studentmanagementsystem.Authentication.StaffRegistration;
import studentmanagementsystem.Authentication.StaffSections;
import studentmanagementsystem.Authentication.AdvisorWhatIf;
import studentmanagementsystem.Authentication.StaffAddCourse;
import studentmanagementsystem.Authentication.StaffAddMajor;
import studentmanagementsystem.Authentication.StaffSections;
import studentmanagementsystem.Authentication.StaffAddInstructor;
import studentmanagementsystem.Authentication.StaffAddStudent;
import studentmanagementsystem.Entities.*;
import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.services.RegistrationService;
import studentmanagementsystem.services.InsertionService;
import studentmanagementsystem.services.DisplayService;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.RegistrationException;

@Controller("/user/staff")
public class StaffController
{	

	// Services to be used by endpoints
	private final RegistrationService registrationService;
	private final InsertionService insertionService;
	private final DisplayService displayService;

	// Constructor
	public StaffController(RegistrationService registrationService, InsertionService insertionService, DisplayService displayService)
	{
		this.registrationService = registrationService;
		this.insertionService = insertionService;
		this.displayService = displayService;
	}



	// Password Generator Method
    private String generateRandomPassword(int length) {
        // Define character pools
        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*()-_+=<>?";
        String combinedChars = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // Ensure at least one character from each pool
        password.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
        password.append(lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
        password.append(numbers.charAt(random.nextInt(numbers.length())));
        password.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        // Fill the rest of the password length with random characters
        for (int i = 4; i < length; i++) {
            password.append(combinedChars.charAt(random.nextInt(combinedChars.length())));
        }

        // Shuffle the password to avoid predictable patterns
        char[] passwordArray = password.toString().toCharArray();
        for (int i = passwordArray.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[j];
            passwordArray[j] = temp;
        }

        return new String(passwordArray);
    }


	@Post("/registration")
	public HttpResponse<Map<String, Object>> GetCurrentRegistration(@Body StaffRegistration req)
	{
		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STAFF)
		{

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
						s.season || ' ' || s.year AS term -- Combine season and year as term
					FROM
						sections s
					JOIN courses c ON s.courseprefix = c.prefix AND s.coursenumber = c.number
					JOIN TargetSemesters t ON
						(s.season = t.nextSeason1 AND s.year = t.nextYear1) OR
						(s.season = t.nextSeason2 AND s.year = t.nextYear2) OR
						(s.season = ? AND s.year = ?)
					WHERE
						s.instructorid = ?;
				""";

				int instructorID = Integer.parseInt((req.getIid().substring(1)));
				System.out.println("Instructor ID: " + instructorID);

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
				ps.setInt(15, instructorID); 
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

		}else if (usertype != UserType.INVALID){
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}


		else{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}

	}

	@Post("/registration/add")
	public HttpResponse<Map<String, Object>> Add(@Body StaffRegistration req)
	{

		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if(usertype == UserType.STAFF)
		{
			
			List<Integer> CRNs = new ArrayList<Integer>();
			CRNs.add(req.getCrn0());
			CRNs.add(req.getCrn1());
			CRNs.add(req.getCrn2());
			CRNs.add(req.getCrn3());
			CRNs.add(req.getCrn4());
			CRNs.add(req.getCrn5());
			List<Integer> successfullyRegistered = new ArrayList<>();
			List<Integer> failedToRegister = new ArrayList<>();

			for(Integer CRN : CRNs)
			{
				try{
					if (CRN == 0){
						continue;
					}else{
						registrationService.registerInstructor(CRN, Integer.parseInt(req.getIid().substring(1)) ,Integer.parseInt(req.getId().substring(1)));
					}
					successfullyRegistered.add(CRN);
				}catch(ServiceException e){
					failedToRegister.add(CRN);
					//e.printStackTrace();
				}catch(RegistrationException e){
					failedToRegister.add(CRN);
					//e.printStackTrace();
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
		}else{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}
	}

	/*@Post("/registration/add")
	public HttpResponse<Map<String, Object>> Add(@Body StaffRegistration req)
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
				int instructorID = Integer.parseInt((req.getIid().substring(1)));
				int staffID = Integer.parseInt(req.getId().substring(1));

				//Returns the instructor department and the staff department
				String checkInstructorDepartmentQuery= """
					SELECT 
						s.DepID AS staffDepartmentID,
						i.DepID AS instructorDepartmentID
					FROM 
						Staff s,
						Instructors i
					WHERE 
						s.StaffID = ? AND
						i.InstructorID = ?;
				""";

				PreparedStatement checkInstructorDepartmentStatement = Application.db.conn.prepareStatement(checkInstructorDepartmentQuery);
				checkInstructorDepartmentStatement.setInt(1, staffID);
				checkInstructorDepartmentStatement.setInt(2, instructorID);
				ResultSet checkInstructorDepartmentResult = checkInstructorDepartmentStatement.executeQuery();

				int staffDepartmentID = checkInstructorDepartmentResult.getInt("staffDepartmentID");
				int instructorDepartmentID = checkInstructorDepartmentResult.getInt("instructorDepartmentID");
				//Check if student is in the same department as the advisor
				if(checkInstructorDepartmentResult.next() && staffDepartmentID != instructorDepartmentID)
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
					String checkDepartmentQuery = """
						SELECT 
							m.depid AS sectionDepartment
						FROM
							Sections s
						JOIN 
							Courses c ON s.courseprefix = c.prefix AND s.coursenumber = c.number 
						JOIN 
							CoursesMajors cm ON cm.number = c.number AND cm.prefix = c.prefix 
						JOIN 
							majors m ON cm.majorid = m.majorid 
						WHERE
							s.CRN = ? 
						LIMIT 1;
					""";

					PreparedStatement checkDepartmentStatement = Application.db.conn.prepareStatement(checkDepartmentQuery);
					checkDepartmentStatement.setInt(1, CRN);
					ResultSet checkDepartmentResult = checkDepartmentStatement.executeQuery();

					//Check if student is in the same major as the course is a part of and that the advisor is part of the course's department
					if(checkDepartmentResult.next() && checkDepartmentResult.getInt("sectionDepartment") != instructorDepartmentID)
					{
						failedToRegister.add(CRN);
						continue;
					}

					//Checks if the current section already has a instructor
					String checkSeatsQuery = """
						SELECT 
							s.InstructorID,
						FROM
							Sections s
						WHERE
							s.CRN = ?;
					""";

					PreparedStatement checkSeatsStatement = Application.db.conn.prepareStatement(checkSeatsQuery);
					checkSeatsStatement.setInt(1, CRN);
					ResultSet checkSeatsResult = checkSeatsStatement.executeQuery();

					if(checkSeatsResult.next() && checkSeatsResult.getInt("AvailableSeats") > 0)
					{

						//Adds instructor to section
						String registerQuery = """
							UPDATE 
								sections
							SET 
								instructor_id = ?
							WHERE 
								crn = ?;
							""";

						PreparedStatement registerStatement = Application.db.conn.prepareStatement(registerQuery);
						registerStatement.setInt(1, instructorID);
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

		//return HttpResponse.ok(response);
	}*/

	@Post("/registration/drop")
	public HttpResponse<Map<String, Object>> Drop(@Body StaffRegistration req)
	{

		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STAFF)
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

			for(Integer CRN : CRNs)
			{
				try{
					if (CRN == 0){
						continue;
					}else{
						registrationService.dropInstructor(CRN, Integer.parseInt(req.getIid().substring(1)) ,Integer.parseInt(req.getId().substring(1)));
					}
					successfullyDropped.add(CRN);
				}catch(ServiceException e){
					failedToDrop.add(CRN);
					e.printStackTrace();
				}catch(RegistrationException e){
					failedToDrop.add(CRN);
					e.printStackTrace();
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
		}

		else if (usertype != UserType.INVALID){
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}else{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}	
	}

	@Post("/courses")
	public HttpResponse<Map<String, Object>> GetCourses(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
			try {
				List<StaffCourseEntry> courses = new ArrayList<StaffCourseEntry>();
				// Fetch depid from staff table
				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();
				int depid = rs.getInt("depid");
				System.out.println("Department ID: " + depid);
				
				// Second query to retrieve courses and their major titles
				ps = Application.db.conn.prepareStatement("""
						SELECT 
							c.title AS course_title, 
							c.prefix AS course_prefix, 
							c.number AS course_number, 
							c.credithours AS course_credithours, 
							m.title AS major_title 
						FROM 
							courses c
						JOIN 
							coursesmajors cm ON c.prefix = cm.prefix AND c.number = cm.number
						JOIN 
							majors m ON cm.majorid = m.majorid
						WHERE 
							m.depid = ?;
						"""
				);
				ps.setInt(1, depid);
				rs = ps.executeQuery();

				// Process the results and create CourseEntry objects
				while (rs.next()) {
					courses.add(new StaffCourseEntry(
						rs.getString("course_title"),
						rs.getString("course_prefix"),
						rs.getInt("course_number"),
						rs.getInt("course_credithours"),
						rs.getString("major_title")
					));
				}

				// Build the response
				for (int i = 0; i < courses.size(); i++) {
					response.put(Integer.toString(i), courses.get(i));
				}
				response.put("status", "success");
				return HttpResponse.ok(response);

			} catch (Exception e) {
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

    @Post("/courses/add")
	public HttpResponse<Map<String, Object>> CreateCourse(@Body StaffAddCourse req)
	{
		Map<String, Object> response = new HashMap<>();
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if (usertype == UserType.STAFF)
		{
			
			try{
				insertionService.addNewCourse(req.getCoursePrefix(), req.getCourseNumber(), req.getCredits(), req.getCourseName(), Integer.parseInt(req.getId().substring(1)), req.getMajor());
			}catch(ServiceException e){
				response.put("status", "failure");
				response.put("message", e.getMessage());
				return HttpResponse.serverError(response);
			}catch(DAOException e){
				response.put("status", "failure");
				response.put("message", e.getMessage());
				return HttpResponse.serverError(response);
			}

			response.put("status", "success");
			response.put("message", "Course added successfully");
			
			return HttpResponse.ok(response);
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

	@Post("/Courses/Remove")
	public HttpResponse<Map<String, Object>> RemoveCourse(@Body StaffAddCourse req)
	{

		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if(usertype == UserType.STAFF)
		{
			//TODO: Get a way to access the course from the current row
			try{
				insertionService.removeCourse(req.getCoursePrefix(), req.getCourseNumber());
			}catch(ServiceException e){
				response.put("status", "failure");
				response.put("message", "Database error occurred");
				return HttpResponse.serverError(response);
			}

			response.put("status", "success");
			response.put("message", "Course removed successfully");
			
			return HttpResponse.ok(response);


		}else if(usertype != UserType.INVALID){
			response.put("status", "failure");
			response.put("error", "invalid user type");
			return HttpResponse.ok(response);
		}else{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
			return HttpResponse.ok(response);
		}

	}

    @Post("/instructors")
	public HttpResponse<Map<String, Object>> GetInstructors(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
				
			try
			{
				List<StaffInstructorEntry> instructors = new ArrayList<StaffInstructorEntry>();
				
				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();

				ps = Application.db.conn.prepareStatement("select fname,lname,phone,instructorid from instructors where depid = ?;");
				ps.setInt(1, rs.getInt("depid"));
				rs = ps.executeQuery();
				while (rs.next())
					instructors.add(new StaffInstructorEntry(rs.getString("fname"), 
					rs.getString("lname"), 
					rs.getBigDecimal("phone").toString(), 
					"I" + Integer.toString(rs.getInt("instructorid"))));

				for (int i = 0; i < instructors.size(); i++)
					response.put(Integer.toString(i), instructors.get(i));
				response.put("status", "success");
				return HttpResponse.ok(response);
			}
			catch (SQLException e)
			{
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

	@Post("/instructors/add")
	public HttpResponse<Map<String, Object>> addInstructor(@Body StaffAddInstructor req)
	{
		Argon2 argon2 = Argon2Factory.create();
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
			try {
				// Check if all fields are provided
				List<String> missingFields = new ArrayList<>();
				if (req.getId() == null || req.getId().isEmpty()) {
					missingFields.add("id");
				}
				if (req.getFirstName() == null || req.getFirstName().isEmpty()) {
					missingFields.add("First Name");
				}
				if (req.getLastName() == null || req.getLastName().isEmpty()) {
					missingFields.add("Last Name");
				}
				if (req.getPhoneNumber() == 0) { // Assuming phoneNumber is an integer
					missingFields.add("Phone Number");
				}
			
				// If any field is missing, return an error response
				if (!missingFields.isEmpty()) {
					response.put("status", "failure");
					response.put("message", "The following fields are missing: " + String.join(", ", missingFields));
					return HttpResponse.badRequest(response);
				}
				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();

				ps = Application.db.conn.prepareStatement("select instructorid from instructors where fname = ? and lname = ? and phone = ?;");
				ps.setString(1, req.getFirstName());
				ps.setString(2, req.getLastName());
				ps.setInt(3, req.getPhoneNumber());
				if(ps.executeQuery().next())
				{
					response.put("status", "failure");
					response.put("message", req.getFirstName() + " " + req.getLastName() + " with Phone Number: " + req.getPhoneNumber() + " already exists");
					return HttpResponse.serverError(response);
				}

				ps = Application.db.conn.prepareStatement("insert into instructors (fname, lname, phone, email, passhash, depid, token) values (?, ?, ?, ?, ?, ?, ?);");
				ps.setString(1, req.getFirstName());
				ps.setString(2, req.getLastName());
				ps.setInt(3, req.getPhoneNumber());
				// Generate a random number between 1 and 20
				Random random = new Random();
				int randomNumber = random.nextInt(20) + 1; // 1 to 20

				// Concatenate the generated random number
				ps.setString(4, req.getFirstName().toLowerCase() + "." + req.getLastName().toLowerCase() + randomNumber + "@uni.edu");
				
				// Generate random password
                String randomPassword = generateRandomPassword(12);

				String hash = argon2.hash(10, 65536, 1, randomPassword);
				ps.setString(5, hash);
				ps.setInt(6, rs.getInt("depid"));
				ps.setString(7, UUID.randomUUID().toString());
	
				ps.executeUpdate();
				response.put("status", "success");
				response.put("message", req.getFirstName() + " " + req.getLastName() + "with Phone Number: " + req.getPhoneNumber() + " added successfully");
				response.put("email", req.getFirstName().toLowerCase() + "." + req.getLastName().toLowerCase() + randomNumber + "@uni.edu");
				response.put("password", randomPassword);

				return HttpResponse.ok(response);
			} catch (Exception e) {
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

	@Post("/major/add")
	public HttpResponse<Map<String, Object>> AddMajor(@Body StaffAddMajor req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
			try
			{
				System.out.println(req.getId());
				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();

				ps = Application.db.conn.prepareStatement("select majorid from majors where title = ?;");
				ps.setString(1, req.getTitle());
				if (ps.executeQuery().next())
				{
					response.put("status", "failure");
					response.put("message", req.getTitle() + " already exists");
					return HttpResponse.serverError(response);
				}

				ps = Application.db.conn.prepareStatement("insert into majors (title, credithours, depid) values (?, ?, ?);");
				ps.setString(1, req.getTitle());
				ps.setInt(2, req.getCredits());
				ps.setInt(3, rs.getInt("depid"));
				ps.executeUpdate();

				response.put("status", "success");
				response.put("message", req.getTitle() + " (" + req.getCredits() + " credits) added successfully");
				return HttpResponse.ok(response);
			}
			catch (SQLException e)
			{
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

	@Post("/major")
	public HttpResponse<Map<String, Object>> AddMajor(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
			try
			{
				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();

				int depid = rs.getInt("depid");

				ps = Application.db.conn.prepareStatement("select majorid, title, credithours, depid from majors where depid = ?;");
				ps.setInt(1, depid);
				rs = ps.executeQuery();

				int i = 0;
				while (rs.next())
				{
					response.put(Integer.toString(i), new Major(rs.getInt("majorid"), rs.getString("title"), rs.getInt("credithours"), rs.getInt("depid")));
					i++;
				}

				ps = Application.db.conn.prepareStatement("select building,office from departments where depid = ?;");
				ps.setInt(1, depid);
				rs = ps.executeQuery();
				rs.next();
				response.put("status", "success");
				response.put("building", rs.getString("building"));
				response.put("room", rs.getInt("office"));
				
				return HttpResponse.ok(response);
			}
			catch (SQLException e)
			{
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

	@Post("/students")
	public HttpResponse<Map<String, Object>> GetStudents(@Body ValidateLogin req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if (usertype == UserType.STAFF)
		{
			try {
				List<StudentEntry> studentsEntries = new ArrayList<StudentEntry>();
			
				// First query to get depid for the given staff ID
				PreparedStatement ps = Application.db.conn.prepareStatement(
					"SELECT depid FROM staff WHERE staffid = ?"
				);
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();
			
				int depid = rs.getInt("depid");
			
				// Second query to retrieve students and their major titles
				ps = Application.db.conn.prepareStatement(
					"SELECT s.studentid, s.fname, s.lname, s.majorid, s.phone, m.title AS major_title " +
                    "FROM students s " +
                    "JOIN majors m ON s.majorid = m.majorid " +
                    "WHERE m.depid = ?"
				);
				ps.setInt(1, depid);
				rs = ps.executeQuery();
			
				// Process the results and create StudentEntry objects
				while (rs.next()) {
					studentsEntries.add(new StudentEntry(
						rs.getString("fname"),
						rs.getString("lname"),
						rs.getString("major_title"), // Use the major title instead of the ID
						rs.getBigDecimal("phone").toString(),
						"U" + Integer.toString(rs.getInt("studentid"))));
				}
			
				// Build the response
				response.put("status", "success");
				for (int i = 0; i < studentsEntries.size(); i++) {
					response.put(Integer.toString(i), studentsEntries.get(i));
				}
			
				return HttpResponse.ok(response);
			} catch (Exception e) {
				response.put("status", "error");
				response.put("message", e.getMessage());
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

	@Post ("/students/add")
	public HttpResponse<Map<String, Object>> AddStudents(@Body StaffAddStudent req)
	{
		Argon2 argon2 = Argon2Factory.create();
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		Map<String, Object> response = new HashMap<>();
		if(usertype == UserType.STAFF)
		{
			try {
				 // Check if all fields are provided
				 List<String> missingFields = new ArrayList<>();
				 if (req.getId() == null || req.getId().isEmpty()) {
					 missingFields.add("id");
				 }
				 if (req.getFirstName() == null || req.getFirstName().isEmpty()) {
					 missingFields.add("First Name");
				 }
				 if (req.getLastName() == null || req.getLastName().isEmpty()) {
					 missingFields.add("Last Name");
				 }
				 if (req.getPhone() == null || req.getPhone().compareTo(BigDecimal.ZERO) == 0) { // Assuming phone is BigDecimal
					 missingFields.add("Phone Number");
				 }
				 if (req.getMajor() == null || req.getMajor().isEmpty()) {
					 missingFields.add("Major");
				 }
			 
				 // If any field is missing, return an error response
				 if (!missingFields.isEmpty()) {
					 response.put("status", "failure");
					 response.put("message", "The following fields are missing: " + String.join(", ", missingFields));
					 return HttpResponse.badRequest(response);
				 }			 

				PreparedStatement ps = Application.db.conn.prepareStatement("select depid from staff where staffid = ?");
				ps.setInt(1, Integer.parseInt(req.getId().substring(1)));
				ResultSet rs = ps.executeQuery();
				rs.next();

				ps = Application.db.conn.prepareStatement("select studentid from students where fname = ? and lname = ? and phone = ?;");
				ps.setString(1, req.getFirstName());
				ps.setString(2, req.getLastName());
				ps.setBigDecimal(3, req.getPhone());

				if(ps.executeQuery().next())
				{
					response.put("status", "failure");
					response.put("message", req.getFirstName() + " " + req.getLastName() + " with Phone Number: " + req.getPhone() + " already exists");
					return HttpResponse.serverError(response);
				}

				// Fetch majorid based on the given major string
				ps = Application.db.conn.prepareStatement("select majorid from majors where title = ?");
				ps.setString(1, req.getMajor());
				rs = ps.executeQuery();

				if (!rs.next()) {
					response.put("status", "failure");
					response.put("message", "Major not found: " + req.getMajor());
					return HttpResponse.serverError(response);
				}
				int majorId = rs.getInt("majorid");

				ps = Application.db.conn.prepareStatement("insert into students (fname, lname, phone, email, passhash, majorid, token) values (?, ?, ?, ?, ?, ?, ?);");
				ps.setString(1, req.getFirstName());
				ps.setString(2, req.getLastName());
				ps.setBigDecimal(3, req.getPhone());
				// Generate a random number between 1 and 20
				Random random = new Random();
				int randomNumber = random.nextInt(20) + 1; // 1 to 20
				ps.setString(4, req.getFirstName().toLowerCase() + "." + req.getLastName().toLowerCase() + randomNumber + "@mail.com");
				// Generate random password
                String randomPassword = generateRandomPassword(12);
				String hash = argon2.hash(10, 65536, 1, randomPassword);
				ps.setString(5, hash);
				ps.setInt(6, majorId);
				ps.setString(7, UUID.randomUUID().toString());

				ps.executeUpdate();
				response.put("status", "success");
				response.put("message", req.getFirstName() + " " + req.getLastName() + "with Phone Number: " + req.getPhone() + " added successfully");
				response.put("email", req.getFirstName().toLowerCase() + "." + req.getLastName().toLowerCase() + randomNumber + "@mail.com");
				response.put("password", randomPassword);

				return HttpResponse.ok(response);
			} catch (Exception e) {
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

	@Post("/sections")
	public HttpResponse<Map<String, Object>> GetCurrentSections(@Body StaffSections req)
	{

		Map<String, Object> response = new HashMap<>();

		int usertype = UserController.ValidateUserType(req.getAuth(), req.getId());
		if(usertype == UserType.STAFF)
		{

			List<StaffSectionsEntryDTO> staffSectionsEntryDTOs = new ArrayList<>();
			try
			{
				staffSectionsEntryDTOs = displayService.getStaffSections(Integer.parseInt(req.getId().substring(1)));

			}catch(ServiceException e){
				response.put("status", "failure");
				response.put("message", e.getMessage());
				return HttpResponse.serverError(response);
			}
			response.put("status", "success");
			for(int i = 0; i < staffSectionsEntryDTOs.size(); i++){
				response.put(Integer.toString(i), staffSectionsEntryDTOs.get(i));
			}

		}else if (usertype != UserType.INVALID)
		{
			response.put("status", "failure");
			response.put("error", "invalid user type");
		}
		else
		{
			response.put("status", "failure");
			response.put("error", "invalid authorization");
		}
		return HttpResponse.ok(response);
	}

	@Post("/sections/add")
	public HttpResponse<Map<String, Object>> AddSection(@Body StaffSections req)
	{

		Map<String, Object> response = new HashMap<>();

		return HttpResponse.ok(response);
	}

	@Post("/sections/remove")
	public HttpResponse<Map<String, Object>> RemoveSection(@Body StaffSections req)
	{

		Map<String, Object> response = new HashMap<>();

		
		return HttpResponse.ok(response);
	}
}
