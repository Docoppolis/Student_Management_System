import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from '../../styles/Instructors/InstructorCurrentCoursesView.module.css';
import { useRouter } from 'next/router';
import CourseComponent from '@/components/Instructors/CourseComponent';
import { getClassTimeBlock } from "../../util/timeBlockUtil";

interface ScheduleEntry { //Added ScheduleEntry interface
    courseName: string;
    building: string;
    room: number;
    time: string;
    coursePrefix: string;
    courseNumber: number;
}

const InstructorCurrentCoursesView:FunctionComponent = () => {
  	
    const router = useRouter();
	const [classes, setClasses] = useState<ScheduleEntry[]>([]); //Changed state to handle ScheduleEntry objects

	const onScheduleClick = useCallback(() => {
		router.push("/Instructors/CurrentCoursesView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Instructors/AllCoursesView");
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

	const getCourses = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/instructor/schedule', {
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

		checkAuth();
		getCourses();
	}, []);

  	return (
    		<div className={styles.instructorCurrentCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Current Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.logout} onClick={onCoursesClick}>
            						<div className={styles.text}>All Courses</div>
          					</div>
        				</div>
        				<div className={styles.logout} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
					<div className={styles.info}>
						<img className={styles.infoIcon} alt="" src="/Info.svg" />
						<b className={styles.text3}>Current Semester: Fall 2024</b>
					</div>
					<div className={styles.courses}>
						{
							classes.length > 0 ? (
								classes.map((course, index) => (
									<CourseComponent 
										key={index}
										name={course.courseName} 
										location={`${course.building} ${course.room}`} 
										time={course.time} 
										code={`${course.coursePrefix} ${course.courseNumber}`}
									/>
								))
							) : (
							<div className={styles.info}>
								<img className={styles.infoIcon} alt="" src="/Info.svg" />
								<b className={styles.text3}>No Courses Available</b>
							</div>
							)
						}
					</div>
      			</div>
    		</div>);
};

export default InstructorCurrentCoursesView;
