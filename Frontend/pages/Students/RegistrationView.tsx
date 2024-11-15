import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentRegistrationView.module.css';
import { useRouter } from 'next/router';
import RegistrationCourseComponent from '@/components/Students/RegistrationCourseComponent';

const StudentRegistrationView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const onScheduleClick = useCallback(() => {
		router.push("/Students/Schedule")
	}, []);

  	const onDegreeProgressClick = useCallback(() => {
		router.push("/Students/DegreeProgressView");
  	}, []);

	const onSearchClick = useCallback(() => {
	router.push("/Students/SearchCoursesInputView");
	}, []);

	const onRegistrationClick = useCallback(() => {
		router.push("/Students/RegistrationView");
	}, []);

	const onWhatifClick = useCallback(() => {
		router.push("/Students/WhatIfView");
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
  	return (
    		<div className={styles.studentRegistrationView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Schedule</div>
          					</div>
          					<div className={styles.button} onClick={onDegreeProgressClick}>
            						<div className={styles.text}>Degree Progress</div>
          					</div>
          					<div className={styles.button} onClick={onSearchClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.button3} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onWhatifClick}>
            						<div className={styles.text}>What-if Analysis</div>
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.pageBody}>
        				<div className={styles.topSection}>
          					<div className={styles.adddropCard}>
            						<div className={styles.header}>
                                        <img className={styles.infoIcon} alt="Info Icon" src="/Info.svg" />
              							<div className={styles.text}>Input up to 6 CRNs to add or drop</div>
            						</div>
            						<div className={styles.body}>
                                        <div className={styles.row}>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <input className={styles.textBox1} type="text" placeholder="Enter CRN" maxLength={5}/>
                                            <img className={`${styles.plusIcon} ${styles.pushDown}`} alt="Plus Icon" src="/Plus.svg" />
                                            <img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
                                        </div>
                                    </div>
          					</div>
          					<div className={styles.divider} />
        				</div>
        				<div className={styles.bottomSection}>
          					<div className={styles.header1}>
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
						<RegistrationCourseComponent code="COP 4362" title="Programming Concepts" credits="3" date="5-10-2024" crn="51010"/>
        				</div>
      			</div>
    		</div>);
};

export default StudentRegistrationView;
