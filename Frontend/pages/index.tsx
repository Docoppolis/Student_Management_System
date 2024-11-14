import { FunctionComponent, useCallback, useEffect } from 'react';
import styles from '../styles/StudentLogin.module.css';
import { useRouter } from 'next/router';

const StudentLogin:FunctionComponent = () => {

	const router = useRouter();
  	
	const getHomePage = (userType: number) =>
	{
		switch (userType)
		{
			case 0:
				return "StudentSchedule";
			case 1:
				return "putotherusertypes in here and below";
		}
		return "";
	}

	const onPageload = useEffect(() => {
		const checkAuth = async () => {
 			if (document.cookie.length === 0)
				return;
			var cookies = document.cookie.split(";");
			if (cookies.length != 2)
			{
				document.cookie = "auth=; Max-Age=0; path=/";
				document.cookie = "email=; Max-Age=0; path=/";
				return;
			}
			const response = await fetch('http://38.45.71.234:8080/user/validate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "email":cookies[1].substring(7)})
			});
			const result = await response.json();
			if (result.status === "success")
				router.push(getHomePage(result.usertype))
		}
		checkAuth();
	}, []);

  	const onLoginButtonContainerClick = useCallback(async () => {
		var emailElement = document.getElementById('email') as HTMLInputElement;
		var passwordElement = document.getElementById('password') as HTMLInputElement;
		var email = emailElement.value;
		var password = passwordElement.value;
		const response = await fetch('http://38.45.71.234:8080/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, password: password })
		});
		const result = await response.json();
		if (result.status === "success")
		{
			var curTime = new Date();
			curTime.setDate(curTime.getDate() + 7);
			document.cookie = "auth=" + result.auth + ";" + "expires=" + curTime.toUTCString() + ";path=/";
			document.cookie = "email=" + email + ";" + "expires=" + curTime.toUTCString() + ";path=/";
			router.push('/StudentSchedule');
		}
		else
			alert("Invalid login!");
  	}, []);

	const handlekeyDown = (event) => {
		if (event.key === "Enter")
			onLoginButtonContainerClick();
	}

  	return (
    		<div className={styles.studentLogin}>
      			<div className={styles.loginComponent}>
        				<div className={styles.studentManagementSystemContainer}>
          					<p className={styles.studentManagement}>Student Management</p>
          					<p className={styles.studentManagement}>System</p>
        				</div>
        				<div className={styles.line} />
        				<div>
						<div className={styles.inputbox}>
							<div className={styles.inputLabel}>Email Address</div>
						</div>
						<input type="text" id="email" name="email" onKeyDown = {handlekeyDown} className={styles.input}/>
						</div>
						<div>
						<div className={styles.inputBox}>
							<div className={styles.inputLabel}>Password</div>
						</div>
						<input type="password" id="password" name="password" onKeyDown = {handlekeyDown} className={styles.input}/>
        				</div>
        				<div className={styles.loginButton} onClick={onLoginButtonContainerClick}>
          					<div className={styles.login}>Login</div>
        				</div>
      			</div>
    		</div>);
};

export default StudentLogin;
