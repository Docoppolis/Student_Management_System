package studentmanagementsystem.services;

import java.util.List;

import DTOs.DepartmentReportDTO;
import DTOs.StaffSectionsEntryDTO;

import java.rmi.ServerException;
import java.sql.SQLException;
import java.util.ArrayList;
import jakarta.inject.Singleton;

import studentmanagementsystem.interfaces.ServiceInterfaces.DisplayServiceInterface;
import studentmanagementsystem.Application;
import studentmanagementsystem.Entities.StudentSection;
import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.Entities.CourseEntry;
import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.Entities.ScheduleEntry;
import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.Entities.Staff;
import studentmanagementsystem.Entities.Department;
import studentmanagementsystem.Entities.Student;
import studentmanagementsystem.DAOs.CourseDAO;
import studentmanagementsystem.DAOs.SectionDAO;
import studentmanagementsystem.DAOs.StudentSectionDAO;
import studentmanagementsystem.DAOs.StaffDAO;
import studentmanagementsystem.exceptions.CourseNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.exceptions.StaffNotFoundException;
import studentmanagementsystem.exceptions.StudentSectionNotFoundException;
import studentmanagementsystem.exceptions.SectionNotFoundException;

@Singleton
public class DisplayService implements DisplayServiceInterface {

    private final SectionDAO sectionDAO;
    private final CourseDAO courseDAO;
    private final StudentSectionDAO studentSectionDAO;
    private final StaffDAO staffDAO;

    public DisplayService(SectionDAO sectionDAO, CourseDAO courseDAO, StudentSectionDAO studentSectionDAO, StaffDAO staffDAO){ 
        this.sectionDAO = sectionDAO;
        this.courseDAO = courseDAO;
        this.studentSectionDAO = studentSectionDAO;
        this.staffDAO = staffDAO;
    }

    //Function to get the schedule of a student
    @Override
    public List<ScheduleEntry> getStudentSchedule(int studentID) throws ServiceException{
        
        List<ScheduleEntry> schedule = new ArrayList<>();

        // Get all student sections for student with studentID
        List<StudentSection> studentSections;
        try{
            studentSections = studentSectionDAO.getStudentSectionsByStudentID(studentID);
        }catch (StudentSectionNotFoundException e){
            throw new ServiceException("No student sections found with studentID: " + studentID);
        }catch (DAOException e){
            throw new ServiceException("Error occurred while retrieving student sections for student with ID: " + studentID, e);
        }

        // For each StudentSection, get the Section
        List<Section> sections = new ArrayList<>();
        for(StudentSection studentSection : studentSections){
            Section section;
            try{
                section = sectionDAO.getSectionByCRN(studentSection.getCRN());
            }catch (SectionNotFoundException e){
                throw new ServiceException("No section found with CRN: " + studentSection.getCRN());
            }catch(DAOException e){
                throw new ServiceException("Error occurred while retrieving section with CRN: " + studentSection.getCRN(), e);
            }
            sections.add(section);
        }

        // For each Section, get the Course
        List<Course> courses = new ArrayList<>();
        for(Section section : sections){
            Course course;
            try{
                course = courseDAO.getCourseByPrefixAndNumber(section.getCoursePrefix(), section.getCourseNumber());
            }catch (CourseNotFoundException e){
                throw new ServiceException("No course found with prefix: " + section.getCoursePrefix() + " and number: " + section.getCourseNumber());
            }catch(DAOException e){
                throw new ServiceException("Error occurred while retrieving course with prefix: " + section.getCoursePrefix() + " and number: " + section.getCourseNumber(), e);
            }
            courses.add(course);
        }

        // Create ScheduleEntry objects
        for(int i = 0; i < studentSections.size(); i++){
            Section section = sections.get(i);
            Course course = courses.get(i);

            if(section.getYear() == Application.current_year && section.getSeason() == Application.current_sem){
                ScheduleEntry entry = new ScheduleEntry(
                    course.getTitle(),
                    section.getBuilding(),
                    section.getRoom(),
                    section.getTimeBlock(),
                    course.getPrefix(),
                    course.getNumber()
                );
                schedule.add(entry);
            }
        }
        return schedule;

    }

    @Override
    public List<CourseEntry> getStaffCourses(int staffID) throws ServiceException
    {

        List<CourseEntry> courseEntries = new ArrayList<>();

        List<Course> courses;
        try{
            courses = courseDAO.getCoursesByDepartment(staffID);
        }catch(DAOException e){
            throw new ServiceException("Error occurred while retrieving courses for staff with ID: " + staffID, e);
        }

        //TODO: Create new class to hold course entries because our naming system is ass and we didn't have one when I thought we did
        /*for(Course course : courses){
            CourseEntry entry = new CourseEntry(

            );
            courseEntries.add(entry);
        }*/


        return courseEntries;
    }

    @Override
    public List<DepartmentReportDTO> getDepartmentReport() throws ServiceException
    {

        List<DepartmentReportDTO> departmentReportDTOs = new ArrayList<>();

        List<Student> students = new ArrayList<>();

        return departmentReportDTOs;
    }

    @Override
    public List<StaffSectionsEntryDTO> getStaffSections(int staffID) throws ServiceException
    {

        List<StaffSectionsEntryDTO> staffSectionsEntryDTOs = new ArrayList<>();

        //Gets the staff entity for user
        Staff staff;
        try{
            staff = staffDAO.getStaffById(staffID);
        }catch(StaffNotFoundException e){
            throw new ServiceException(e.getMessage());
        }catch(DAOException e){
            throw new ServiceException(e.getMessage());
        }

        //Creates list of coruses for the department of the staff member
        List<Course> courses;
        try{
            courses = courseDAO.getCoursesByDepartment(staff.getDepid());
        }catch(DAOException e){
            throw new ServiceException(e.getMessage());
        }

        //Creates list of sections for the courses
        List<Section> sections = new ArrayList<>();
        for(Course course : courses){
            List<Section> tempSections;
            try{
                tempSections = sectionDAO.getSectionsByPrefixAndNumber(course.getPrefix(), course.getNumber());
            }catch(DAOException e){
                throw new ServiceException(e.getMessage());
            }catch(SectionNotFoundException e){
                throw new ServiceException(e.getMessage());
            }
            sections.addAll(tempSections);
        }

        //Creates the StaffSectionsEntryDTO objects
        for(Section section : sections){
            String title = null;
            int creditHours = 0;
            for(Course course : courses){
                if(course.getPrefix().equals(section.getCoursePrefix()) && course.getNumber() == section.getCourseNumber()){
                    title = course.getTitle();
                    creditHours = course.getCreditHours();
                }
            }
            StaffSectionsEntryDTO entry = new StaffSectionsEntryDTO(
                section.getCoursePrefix(),
                section.getCourseNumber(),
                section.getCrn(),
                section.getTimeBlock(),
                title,
                creditHours,
                section.getSeats(),
                section.getSeason(),
                section.getYear()
            );
            staffSectionsEntryDTOs.add(entry);
        }

        return staffSectionsEntryDTOs;
    }

}
