import { FunctionComponent, useCallback } from 'react';
import styles from '../styles/StudentLogin.module.css';
import { useRouter } from 'next/router';

const StudentLogin:FunctionComponent = () => {

	const router = useRouter();
  	
  	const onLoginButtonContainerClick = useCallback(async () => {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		const response = await fetch('http://38.45.71.234:8080/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const result = await response.json();
		if (result.status === "success")
    			router.push('/StudentSchedule');
  	}, []);
  	
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
						<input type="text" id="email" name="email" className={styles.input}/>
					</div>
					<div>
						<div className={styles.inputBox}>
							<div className={styles.inputLabel}>Password</div>
						</div>
						<input type="text" id="password" name="password" className={styles.input}/>
        				</div>
        				<div className={styles.loginButton} onClick={onLoginButtonContainerClick}>
          					<div className={styles.login}>Login</div>
        				</div>
      			</div>
    		</div>);
};

export default StudentLogin;
