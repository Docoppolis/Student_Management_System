package studentmanagementsystem.controllers;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/user")
public class UserController {

    //Test to make sure controller is working
    @Get("/")
    public String index() {
        return "User Controller is working!";
    }

}
