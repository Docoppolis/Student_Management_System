package studentmanagementsystem.Authentication;

import java.math.BigDecimal;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class StaffAddStudent {
    private String auth;
	private String id;
    private String firstName;
    private String lastName;
    private String major;
    private BigDecimal phone;

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

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getMajor()
    {
        return major;
    }

    public void setMajor(String major)
    {
        this.major = major;
    }

    public BigDecimal getPhone()
    {
        return phone;
    }

    public void setPhone(BigDecimal phone)
    {
        this.phone = phone;
    }
}
