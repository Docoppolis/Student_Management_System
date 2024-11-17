import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Instructors/InstructorAllCoursesView.module.css';
import { useRouter } from 'next/router';

const InstructorAllCoursesView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const onScheduleClick = useCallback(() => {
		router.push("/Instructors/CurrentCoursesView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Instructors/AllCoursesView");
  	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
  	return (
    		<div className={styles.instructorAllCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Current Courses</div>
          					</div>
          					<div className={styles.button1} onClick={onCoursesClick}>
            						<div className={styles.text}>All Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
        				<div className={styles.leftParent}>
          					<div className={styles.left}>
            						<div className={styles.term}>
              							<div className={styles.term1}>
                								<b className={styles.currentTerm}>Spring 2025</b>
              							</div>
              							<div className={styles.columns}>
                								<div className={styles.course}>Course</div>
                								<div className={styles.course}>Credits</div>
                								<div className={styles.course}>Grade</div>
              							</div>
              							<div className={styles.line} />
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>IP</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>IP</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>IP</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>IP</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>IP</div>
              							</div>
            						</div>
            						<div className={styles.term}>
              							<div className={styles.term1}>
                								<b className={styles.currentTerm}>Fall 2024</b>
              							</div>
              							<div className={styles.columns}>
                								<div className={styles.course}>Course</div>
                								<div className={styles.course}>Credits</div>
                								<div className={styles.course}>Grade</div>
              							</div>
              							<div className={styles.line} />
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
            						</div>
            						<div className={styles.term}>
              							<div className={styles.term1}>
                								<b className={styles.currentTerm}>Fall 2022</b>
              							</div>
              							<div className={styles.columns}>
                								<div className={styles.course}>Course</div>
                								<div className={styles.course}>Credits</div>
                								<div className={styles.course}>Grade</div>
              							</div>
              							<div className={styles.line} />
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
              							<div className={styles.course1}>
                								<div className={styles.course}>CAP 4662 - Introduction to Robotics</div>
                								<div className={styles.course}>3.0</div>
                								<div className={styles.course}>A</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default InstructorAllCoursesView;
