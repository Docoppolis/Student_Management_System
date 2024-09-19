package studentmanagementsystem;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/students")
public class StudentController {

    @Get("/")
    public String index() {
        return "Student Controller is working!";
    }
}
