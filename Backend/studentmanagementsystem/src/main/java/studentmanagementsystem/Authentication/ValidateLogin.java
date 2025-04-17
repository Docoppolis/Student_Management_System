package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class ValidateLogin
{
	private String auth;
	private String id;
	
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
}
