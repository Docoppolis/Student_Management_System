package studentmanagementsystem.Entities;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class Course {

    private String name;
    private String prefix;
    private String department;
    private int number;
    private int credits;

    //Constructor
    public Course(String name, String prefix, int number, int credits)
    {
        this.name = name;
        this.prefix = prefix;
        this.number = number;
    }

    //Getters and Setters
    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getPrefix(){
        return prefix;
    }

    public void setPrefix(String prefix){
        this.prefix = prefix;
    }

    public String getDepartment(){
        return department;
    }

    public void setDepartment(String department){
        this.department = department;
    }

    public int getNumber(){
        return number;
    }

    public void setNumber(int number){
        this.number = number;
    }

    public int getCredits(){
        return credits;
    }

    public void setCredits(int credits){
        this.credits = credits;
    }

}
