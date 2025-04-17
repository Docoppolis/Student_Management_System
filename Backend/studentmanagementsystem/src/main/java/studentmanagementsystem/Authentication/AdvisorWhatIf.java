package studentmanagementsystem.Authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable.Deserializable
public class AdvisorWhatIf
{
	private String auth;
	private String id;
	private String uid;
	
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

	public void setUid(String uid)
	{
		this.uid = uid;
	}

	public String getUid()
	{
		return uid;
	}
}
