package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class StudentRegistration
{
	private String auth;
	private String email;
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

	public String getEmail()
	{
		return email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}

	public int getcrn0()
	{
		return crn0;
	}

	public void setcrn0(int crn)
	{
		this.crn0 = crn;
	}

	public int getcrn1()
	{
		return crn1;
	}

	public void setcrn1(int crn)
	{
		this.crn1 = crn;
	}

	public int getcrn2()
	{
		return crn2;
	}

	public void setcrn2(int crn)
	{
		this.crn2 = crn;
	}

	public int getcrn3()
	{
		return crn3;
	}

	public void setcrn3(int crn)
	{
		this.crn3 = crn;
	}

	public int getcrn4()
	{
		return crn4;
	}

	public void setcrn4(int crn)
	{
		this.crn4 = crn;
	}

	public int getcrn5()
	{
		return crn5;
	}

	public void setcrn5(int crn)
	{
		this.crn5 = crn;
	}
}
