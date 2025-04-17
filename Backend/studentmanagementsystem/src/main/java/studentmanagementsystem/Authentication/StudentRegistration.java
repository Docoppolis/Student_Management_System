package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class StudentRegistration
{
	private String auth;
	private String id;
	private int crn0;
	private int crn1;
	private int crn2;
	private int crn3;
	private int crn4;
	private int crn5;
	
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

	public int getCrn0()
	{
		return crn0;
	}

	public void setCrn0(int crn)
	{
		this.crn0 = crn;
	}

	public int getCrn1()
	{
		return crn1;
	}

	public void setCrn1(int crn)
	{
		this.crn1 = crn;
	}

	public int getCrn2()
	{
		return crn2;
	}

	public void setCrn2(int crn)
	{
		this.crn2 = crn;
	}

	public int getCrn3()
	{
		return crn3;
	}

	public void setCrn3(int crn)
	{
		this.crn3 = crn;
	}

	public int getCrn4()
	{
		return crn4;
	}

	public void setCrn4(int crn)
	{
		this.crn4 = crn;
	}

	public int getCrn5()
	{
		return crn5;
	}

	public void setCrn5(int crn)
	{
		this.crn5 = crn;
	}
}
