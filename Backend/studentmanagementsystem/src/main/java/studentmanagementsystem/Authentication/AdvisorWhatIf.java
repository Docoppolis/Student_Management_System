package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class AdvisorWhatIf
{
	private String auth;
	private String email;
	private String uid;
	
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

	public void setUID(String uid)
	{
		this.uid = uid;
	}

	public String getUID()
	{
		return uid;
	}
}
