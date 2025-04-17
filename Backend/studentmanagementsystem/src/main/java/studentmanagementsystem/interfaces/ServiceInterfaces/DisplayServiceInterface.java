package studentmanagementsystem.interfaces.ServiceInterfaces;

import java.util.List;

import DTOs.DepartmentReportDTO;
import DTOs.StaffSectionsEntryDTO;
import studentmanagementsystem.Entities.CourseEntry;
import studentmanagementsystem.Entities.ScheduleEntry;
import studentmanagementsystem.exceptions.ServiceException;


public interface DisplayServiceInterface {

    List<ScheduleEntry> getStudentSchedule(int studentID) throws ServiceException;
    List<CourseEntry> getStaffCourses(int staffID) throws ServiceException;
    List<DepartmentReportDTO> getDepartmentReport() throws ServiceException;
    List<StaffSectionsEntryDTO> getStaffSections(int staffID) throws ServiceException;

}
