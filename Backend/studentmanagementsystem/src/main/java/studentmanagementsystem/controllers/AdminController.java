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


@Controller("/user/admin")
public class AdminController 
{


    @Post("/data-log")
    public HttpResponse<String> DataLog(@Body String data)
    {



        return null;

    }

    @Post("/student-report")
    public HttpResponse<String> StudentReport(@Body String data)
    {

        return null;

    }

    @Post("/department-report")
    public HttpResponse<String> DepartmentReport(@Body String data)
    {

        

        return null;

    }

    @Post("/enrollment-report")
    public HttpResponse<String> EnrollmentReport(@Body String data)
    {

        return null;

    }

    @Post("/instructor-report")
    public HttpResponse<String> InstructorReport(@Body String data)
    {

        return null;

    }

    @Post("/major-report")
    public HttpResponse<String> MajorReport(@Body String data)
    {

        return null;

    }
}
