package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class StaffAddCourse {
    private String auth;
	private String id;
    private String courseName;
    private String coursePrefix;
    private int courseNumber;
    private int credits;
    private String major;

    public String getAuth()
	{
		return auth;
	}
	
	public void setAuth(String auth)
	{
		this.auth = auth;
	}

	public String getId()
	{
		return id;
	}
	
	public void setId(String id)
	{
		this.id = id;
	}

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
