import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Advisors/AdvisorRegistrationView.module.css';
import { useRouter } from 'next/router';

const AdvisorRegistrationView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const onSearchCoursesClick = useCallback(() => {
		router.push("/Advisors/AdvisorSearchCoursesView")
	}, []);

    const onRegistrationClick = useCallback(() => {
		router.push("/Advisors/AdvisorRegistrationView")
	}, []);

    const onStudentClick = useCallback(() => {
		router.push("/Advisors/AdvisorStudentView")
	}, []);

    const onWhatIfClick = useCallback(() => {
		router.push("/Advisors/AdvisorWhatIfView")
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
  	return (
    		<div className={styles.advisorRegistrationView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onSearchCoursesClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.button1} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onStudentClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.button} onClick={onWhatIfClick}>
            						<div className={styles.text}>What-If Analysis</div>
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.pageBody}>
        				<div className={styles.topSection}>
          					<div className={styles.columns}>
            						<div className={styles.card}>
              							<div className={styles.header}>
                								<div className={styles.enterStudentId}>Enter Student ID</div>
              							</div>
              							<div className={styles.body}>
                								<div className={styles.columns}>
                  									<div className={styles.textBox}>
                                                      <input type="text" className={styles.textBoxInput} maxLength={9} defaultValue="U12345678" />
                  									</div>
                  									<img className={`f${styles.checkIcon} ${styles.pushDown}`} alt="" src="/Check.svg" />
                								</div>
              							</div>
            						</div>
            						<div className={styles.adddropCard}>
              							<div className={styles.header1}>
                								<img className={styles.checkIcon} alt="" src="/Info.svg" />
                								<div className={styles.text}>Input up to 6 CRNs to add or drop</div>
              							</div>
              							<div className={styles.body1}>
                                            <div className={styles.row}>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <input className={styles.textBox2} type="text" placeholder="Enter CRN" maxLength={5}/>
                                                <img className={`${styles.plusIcon} ${styles.pushDown}`} alt="Plus Icon" src="/Plus.svg" />
                                                <img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
                                            </div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.divider} />
        				</div>
        				<div className={styles.bottomSection}>
          					<div className={styles.header2}>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Course</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Title</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Credits</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Registration Date</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>CRN</div>
            						</div>
          					</div>
          					<div className={styles.rows}>
            						<div className={styles.header2}>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>EDU1004</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>Intro To Taking Classes</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>3 credits</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>5-16-2024</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>54321</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default AdvisorRegistrationView;
