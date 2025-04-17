package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class StaffAddMajor
{
	private String auth;
	private String id;
    private String title;
    private int credits;
	
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

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public int getCredits()
    {
        return credits;
    }

    public void setCredits(int credits)
    {
        this.credits = credits;
    }
}
