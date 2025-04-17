package studentmanagementsystem.services;

import jakarta.inject.Singleton;
import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.exceptions.StaffNotFoundException;
import studentmanagementsystem.exceptions.InstructorNotFoundException;
import studentmanagementsystem.exceptions.RegistrationException;
import studentmanagementsystem.exceptions.SectionNotFoundException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.CourseNotFoundException;
import studentmanagementsystem.interfaces.ServiceInterfaces.RegistrationServiceInterface;
import studentmanagementsystem.Application;
import studentmanagementsystem.DAOs.SectionDAO;
import studentmanagementsystem.DAOs.InstructorDAO;
import studentmanagementsystem.DAOs.CourseDAO;
import studentmanagementsystem.DAOs.StaffDAO;
import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.Entities.Instructor;
import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.Entities.Staff;


@Singleton
public class RegistrationService implements RegistrationServiceInterface {

    private final SectionDAO sectionDAO;
    private final InstructorDAO instructorDAO;
    private final CourseDAO courseDAO;
    private final StaffDAO staffDAO;

    public RegistrationService(SectionDAO sectionDAO, InstructorDAO instructorDAO, CourseDAO courseDAO, StaffDAO staffDAO) {
        this.sectionDAO = sectionDAO;
        this.instructorDAO = instructorDAO;
        this.courseDAO = courseDAO;
        this.staffDAO = staffDAO;
    }

    @Override
    public void registerInstructor(Integer crn, int instructorID, int staffID) throws ServiceException, RegistrationException 
    {
        
        // Get the section, instructor, course, and staff
        Section section;
        Instructor instructor;
        Course course;
        Staff staff;
        try{

            section = sectionDAO.getSectionByCRN(crn);
            instructor = instructorDAO.getInstructorById(instructorID);
            course = courseDAO.getCourseByPrefixAndNumber(section.getCoursePrefix(), section.getCourseNumber());
            staff = staffDAO.getStaffById(staffID);

        }catch(SectionNotFoundException e){

            throw new RegistrationException("No section found with CRN: " + crn);

        }catch(InstructorNotFoundException e){

            throw new RegistrationException("No instructor found with ID: " + instructorID);

        }catch(CourseNotFoundException e){

            throw new RegistrationException("No course found for section with CRN: " + crn);

        }catch(StaffNotFoundException e){

            throw new RegistrationException("No staff member found with ID: " + staffID);

        }catch(DAOException e){

            throw new ServiceException("Error occurred while retrieving data", e);

        }

        

        if(staff.getDepid() != instructor.getDepid()){//Check if staff is in the same department as the instructor

            throw new RegistrationException("Staff with ID: " + staffID + " is not part of the same department as instructor with ID: " + instructorID);

        }else if(instructor.getDepid() != course.getDepartmentID()){ //Check if instructor is in the same department as the course

            throw new RegistrationException("Instructor with ID: " + instructorID + " is not part of the department that course with prefix: " + section.getCoursePrefix() + " and number: " + section.getCourseNumber() + " belongs to");

        }else if(instructor.getDepid() != course.getDepartmentID()){ //Check if instructor is in the same department as the course

            throw new RegistrationException("Instructor with ID: " + instructorID + " is not part of the department that course with prefix: " + section.getCoursePrefix() + " and number: " + section.getCourseNumber() + " belongs to");

        }else if(section.getInstructorID() != 0){ //Check if section already has an instructor

            throw new RegistrationException("Section with CRN: " + crn + " already has an instructor assigned");

        }else{

            try{
                sectionDAO.updateInstructorID(crn, instructorID);

            }catch(DAOException e){

                throw new ServiceException("Error occurred while updating instructor for section with CRN: " + crn, e);

            }catch(SectionNotFoundException e){

                throw new RegistrationException("No section found with CRN: " + crn);
            }
        }
    }

    @Override
    public void dropInstructor(Integer crn, int instructorID, int staffID) throws ServiceException, RegistrationException
    {

        // Get the section, instructor, course, and staff
        Section section;
        Instructor instructor;
        Course course;
        Staff staff;
        try{

            section = sectionDAO.getSectionByCRN(crn);
            instructor = instructorDAO.getInstructorById(instructorID);
            course = courseDAO.getCourseByPrefixAndNumber(section.getCoursePrefix(), section.getCourseNumber());
            staff = staffDAO.getStaffById(staffID);

        }catch(SectionNotFoundException e){

            throw new RegistrationException("No section found with CRN: " + crn);

        }catch(InstructorNotFoundException e){

            throw new RegistrationException("No instructor found with ID: " + instructorID);

        }catch(CourseNotFoundException e){

            throw new RegistrationException("No course found for section with CRN: " + crn);

        }catch(StaffNotFoundException e){

            throw new RegistrationException("No staff member found with ID: " + staffID);

        }catch(DAOException e){

            throw new ServiceException("Error occurred while retrieving data", e);

        }

        if(staff.getDepid() != instructor.getDepid()){//Check if staff is in the same department as the instructor

            throw new RegistrationException("Staff with ID: " + staffID + " is not part of the same department as instructor with ID: " + instructorID);

        }else if(section.getInstructorID() != instructorID){ //Check the instructor is assigned to the section

            throw new RegistrationException("Instructor with ID: " + instructorID + " is not assigned to section with CRN: " + crn);

        }else{
            
            //Drops the instructor from the section
            try{
                sectionDAO.updateInstructorID(crn, null);

            }catch(DAOException e){

                throw new ServiceException("Error occurred while updating instructor for section with CRN: " + crn, e);

            }catch(SectionNotFoundException e){

                throw new RegistrationException("No section found with CRN: " + crn);
            }
        }
    }
}
