import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentScheduleView.module.css';
import { useRouter } from 'next/router';
import CourseComponent from '../../components/Students/CourseComponent';

const StudentScheduleView:FunctionComponent = () => {
	
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
    		<div className={styles.studentScheduleView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onScheduleClick}>
								<div className={styles.text}>Schedule</div>
								<div className={styles.buttonChild}/>
							</div>
          					<div className={styles.tabButton} onClick={onDegreeProgressClick}>
            						<div className={styles.text}>Degree Progress</div>
          					</div>
          					<div className={styles.tabButton} onClick={onSearchClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.tabButton} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
          					</div>
          					<div className={styles.tabButton} onClick={onWhatifClick}>
            						<div className={styles.text}>What-if Analysis</div>
          					</div>
        				</div>
        				<div className={styles.tabButton} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.pageBody}>
        				<div className={styles.courses}>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
        				</div>
      			</div>
    		</div>);
};

export default StudentScheduleView;
