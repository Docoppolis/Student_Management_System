import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentScheduleView.module.css';
import { useRouter } from 'next/router';
import CourseComponent from '../../components/Students/CourseComponent';
import { useEffect, useState } from 'react';

const StudentScheduleView:FunctionComponent = () => {
	
	const router = useRouter();
	const [classes, setClasses] = useState([]);

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
			return result.status === "success";
		}

		const getCourses = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://38.45.71.234:8080/user/student/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "email":cookies[1].substring(7)})
			});
			const result = await response.json();
			var class_list = []
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 1; i++)
					class_list.push([result[i.toString()].title, result[i.toString()].loc, result[i.toString()].time, result[i.toString()].code]);

			}
			setClasses(class_list);
		}

		//checkAuth();
		//getCourses();
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
        				{
							classes.length > 0 ? (classes.map((course, index) => (
								<CourseComponent name={course[0]} location={course[1]} time={course[2]} code={course[3]}/>
							)))
							:
							(<><CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/>
							<CourseComponent name="Introduction to Robotics" location="CWY 122" time="3:30pm - 4:45pm" code="COP 1220"/></>
						)
						}
        				</div>
      			</div>
    		</div>);
};

export default StudentScheduleView;
