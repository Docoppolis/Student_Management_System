import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Instructors/InstructorCurrentCoursesView.module.css';
import { useRouter } from 'next/router';

const InstructorCurrentCoursesView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const onScheduleClick = useCallback(() => {
		router.push("/Instructors/InstructorCurrentCoursesView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Instructors/InstructorAllCoursesView");
  	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
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
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Introduction To Robotics</div>
            						</div>
            						<div className={styles.cap4662}>CAP 4662</div>
            						<div className={styles.pm445pm}>3:30pm - 4:45pm TR @ CWY 122</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Introduction To C++</div>
            						</div>
            						<div className={styles.cap4662}>COP 4610</div>
            						<div className={styles.pm445pm}>3:30pm - 4:45pm MW @ CHE 101</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Software System Development</div>
            						</div>
            						<div className={styles.cap4662}>COP 4365</div>
            						<div className={styles.pm445pm}>9:30pm - 10:45pm TR @ ENB 118</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Digital Logic Circuits</div>
            						</div>
            						<div className={styles.cap4662}>CDA 4210</div>
            						<div className={styles.pm445pm}>5:00pm - 6:15pm TR @ CWY 122</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Introduction To English</div>
            						</div>
            						<div className={styles.cap4662}>ENC 1200</div>
            						<div className={styles.pm445pm}>3:30pm - 4:45pm F @ CWY 122</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.introductionToRoboticsWrapper}>
              							<div className={styles.introductionToRobotics}>Chemistry II</div>
            						</div>
            						<div className={styles.cap4662}>CHE 2800</div>
            						<div className={styles.pm445pm}>12:45pm - 2:00pm T @ CHE 303</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default InstructorCurrentCoursesView;
