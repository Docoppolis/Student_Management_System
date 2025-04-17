package studentmanagementsystem.services;

import studentmanagementsystem.interfaces.ServiceInterfaces.InsertionServiceInterface;
import jakarta.inject.Singleton;
import studentmanagementsystem.DAOs.CourseDAO;
import studentmanagementsystem.DAOs.StaffDAO;
import studentmanagementsystem.DAOs.MajorsDAO;
import studentmanagementsystem.DAOs.SectionDAO;
import studentmanagementsystem.DAOs.CoursesMajorsDAO;
import studentmanagementsystem.Entities.Course;
import studentmanagementsystem.Entities.Staff;
import studentmanagementsystem.Entities.Major;
import studentmanagementsystem.Entities.Section;
import studentmanagementsystem.exceptions.ServiceException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.InsertionException;
import studentmanagementsystem.exceptions.DAOException;
import studentmanagementsystem.exceptions.StaffNotFoundException;
import studentmanagementsystem.exceptions.MajorNotFoundException;;

@Singleton
public class InsertionService implements InsertionServiceInterface {

    private final CourseDAO courseDAO;
    private final StaffDAO staffDAO;
    private final CoursesMajorsDAO coursesMajorsDAO;
    private final MajorsDAO majorsDAO;
    private final SectionDAO sectionDAO;

    public InsertionService(CourseDAO courseDAO, StaffDAO staffDAO, CoursesMajorsDAO coursesMajorsDAO, MajorsDAO majorsDAO, SectionDAO sectionDAO) {
        this.courseDAO = courseDAO;
        this.staffDAO = staffDAO;
        this.coursesMajorsDAO = coursesMajorsDAO;
        this.majorsDAO = majorsDAO;
        this.sectionDAO = sectionDAO;
    }

    @Override
    public void addNewCourse(String prefix, int number, int credits, String title, int staffID, String majorTitle) throws ServiceException, DAOException {
        
        // Creates Staff object to get the department ID
        Staff staff;
        try{
            staff = staffDAO.getStaffById(staffID);
        }catch(StaffNotFoundException e){
            throw new ServiceException("No staff found with id: " + staffID);
        }catch(DAOException e){
            //throw new ServiceException("Error occurred while retrieving staff with id: " + staffID, e);
            throw e;
        }

        Major major;
        try{
            major = majorsDAO.getMajorByTitle(majorTitle);
        }catch(MajorNotFoundException e){
            throw new ServiceException("No major found with title: " +  majorTitle);
        }catch(DAOException e){
            throw e;
        }
        
        // Creates Course object to add to the database
        Course course = new Course(prefix, number, credits, title, staff.getDepid());

        // Adds the course to the database
        try{
            courseDAO.addCourse(course);
            coursesMajorsDAO.addCourseToMajor(prefix, number, major.getMajorID());
        }catch(DAOException e){
            throw e;
        }

    }

    @Override
    public void removeCourse(String prefix, int number) throws ServiceException {

        // Removes the course from the database
        try{
            
            courseDAO.removeCourse(prefix, number);

        }catch(DAOException e){
            throw new ServiceException("Error occurred while removing course with prefix: " + prefix + " and number: " + number, e);
        }

    }

    @Override
    public void addNewSection(int crn, String prefix, int number, int timeBlock, String building, int room, int season, int year, int seats) throws ServiceException 
    {

        // Creates Section object to add to the database
        Section section = new Section(crn, season, year, timeBlock, building, room, prefix, number, 0, seats);

        // Adds the section to the database
        try{
            sectionDAO.addSection(section);
        }catch(DAOException e){
            throw new ServiceException("Error occurred while adding section with prefix: " + prefix + " and number: " + number, e);
        }
    }
}
