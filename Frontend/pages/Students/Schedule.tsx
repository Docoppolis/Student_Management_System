import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentScheduleView.module.css';
import { useRouter } from 'next/router';
import CourseComponent from '../../components/Students/CourseComponent';
import { useEffect, useState } from 'react';
import { getClassTimeBlock } from "../../util/timeBlockUtil";

interface ScheduleEntry { //Added ScheduleEntry interface
    courseName: string;
    building: string;
    room: number;
    time: string;
    coursePrefix: string;
    courseNumber: number;
}

const StudentScheduleView:FunctionComponent = () => {
	
	const router = useRouter();
	const [classes, setClasses] = useState<ScheduleEntry[]>([]); //Changed state to handle ScheduleEntry objects

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
		document.cookie = "id=; Max-Age=0; path=/";
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
				document.cookie = "id=; Max-Age=0; path=/";
				return;
			}
			const response = await fetch('http://localhost:8080/user/validate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			return result.status === "success";
		}

		//Updated getCourses to take ScheduleEntry objects
		const getCourses = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/student/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			const scheduleEntries: ScheduleEntry[] = [];
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 1; i++)
					scheduleEntries.push({
						courseName: result[i.toString()].courseName,
                        building: result[i.toString()].building,
                        room: result[i.toString()].room,
                        time: getClassTimeBlock(result[i.toString()].time),
                        coursePrefix: result[i.toString()].coursePrefix,
                        courseNumber: result[i.toString()].courseNumber,
					})

			}
			setClasses(scheduleEntries);
		}

		/*const getCourses = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/student/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			var class_list = []
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 1; i++)
					class_list.push([result[i.toString()].courseName, result[i.toString()].building + result[i.toString()].room, result[i.toString()].time, result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber.toString()]);

			}
			setClasses(class_list);
		}*/

		checkAuth();
		getCourses();
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
					<div className={styles.info}>
						<img className={styles.infoIcon} alt="" src="/Info.svg" />
						<b className={styles.text3}>Current Semester: Fall 2024</b>
					</div>
					<div className={styles.courses}>
					{
						classes.length > 0 ? (classes.map((course, index) => (
							<CourseComponent name={course.courseName} location={course.building + " " + course.room} time={course.time} code={course.coursePrefix + " " + course.courseNumber}/>
						)))
						:
						(<><p>No classes.</p></>
					)
					}
					</div>
      			</div>
    		</div>);
};

export default StudentScheduleView;
