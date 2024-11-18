package studentmanagementsystem.controllers;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
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
import studentmanagementsystem.Authentication.AdvisorRegistration;
import studentmanagementsystem.Authentication.AdvisorWhatIf;
import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.Entities.Section;

@Controller("/user/advisor")
public class AdvisorController
{	

	@Post("/register")
	public HttpResponse<String> Register(@Body AdvisorRegistration req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.ADVISOR)
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
	public HttpResponse<String> Drop(@Body AdvisorRegistration req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.ADVISOR)
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
	public HttpResponse<String> WhatIf(@Body AdvisorWhatIf req)
	{
		int usertype = UserController.ValidateUserType(req.getAuth(), req.getEmail());
		if (usertype == UserType.ADVISOR)
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
