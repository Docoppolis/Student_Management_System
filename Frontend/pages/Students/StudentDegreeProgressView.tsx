import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentDegreeProgressView.module.css';
import { useRouter } from 'next/router';


const StudentDegreeProgressView:FunctionComponent = () => {
  	
	const router = useRouter();  	

	const onScheduleClick = useCallback(() => {
		router.push("/Students/StudentSchedule")
	}, []);

  	const onDegreeProgressClick = useCallback(() => {
		router.push("/Students/StudentDegreeProgressView");
  	}, []);

	const onSearchClick = useCallback(() => {
	router.push("/Students/StudentSearchCoursesInputView");
	}, []);

	const onRegistrationClick = useCallback(() => {
		router.push("/Students/StudentRegistrationView");
	}, []);

	const onWhatifClick = useCallback(() => {
		router.push("/Students/StudentWhatIfView");
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
  	return (
    		<div className={styles.studentDegreeprogressView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Schedule</div>
          					</div>
          					<div className={styles.button1} onClick={onDegreeProgressClick}>
            						<div className={styles.text}>Degree Progress</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onSearchClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.button} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
          					</div>
          					<div className={styles.button} onClick={onWhatifClick}>
            						<div className={styles.text}>What-if Analysis</div>
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
        				<div className={styles.coursesCard}>
          					<div className={styles.header}>
            						<div className={styles.text}>{`15/126 Credit Hours `}</div>
            						<div className={styles.text}>GPA: 4.0</div>
          					</div>
          					<div className={styles.body1}>
            						<div className={styles.bodylist}>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>Course Abbreviation</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>Credit Hours</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>Term</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>Grade Earned (IP = In progress)</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>CAP 4321</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>3</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>F24</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>IP</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>ABC 3421</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>2</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>F24</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>IP</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>ZYX 1221</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>3</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>S23</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>A</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>COT 1212</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>3</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>S23</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>A</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>COT 3221</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>3</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>S23</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>A</div>
                								</div>
              							</div>
              							<div className={styles.entry}>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>EDU 4321</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>1</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.term1}>S23</div>
                								</div>
                								<div className={styles.divider}>
                  									<div className={styles.dividerChild} />
                								</div>
                								<div className={styles.abbreviation}>
                  									<div className={styles.text}>A</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StudentDegreeProgressView;
