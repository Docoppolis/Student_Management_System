import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentWhatIfView.module.css';
import { useRouter } from 'next/router';

const StudentWhatIfView:FunctionComponent = () => {
  	
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
    		<div className={styles.studentWhatIfView}>
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
          					<div className={styles.button} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
          					</div>
          					<div className={styles.button4} onClick={onWhatifClick}>
            						<div className={styles.text}>What-if Analysis</div>
            						<div className={styles.buttonChild} />
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
        				<div className={styles.top}>
          					<div className={styles.instructions}>
            						<img className={styles.infoIcon} alt="" src="/Info.svg" />
            						<div className={styles.textParent}>
              							<i className={styles.text6}>Analyze what your GPA would be based on the grades you earn in future classes</i>
              							<div className={styles.text}>
                								<ul className={styles.selectTheNumberOfClassesT}>
                  									<li>Select the number of classes to test</li>
                								</ul>
              							</div>
              							<div className={styles.text}>
                								<ul className={styles.selectTheNumberOfClassesT}>
                  									<li>Choose the number of credit hours per course</li>
                								</ul>
              							</div>
              							<div className={styles.text}>
                								<ul className={styles.selectTheNumberOfClassesT}>
                  									<li>Choose the grade earned in each course</li>
                								</ul>
              							</div>
              							<div className={styles.text}>
                								<ul className={styles.selectTheNumberOfClassesT}>
                  									<li>View the GPA you would have after earning those grades in those courses</li>
                								</ul>
              							</div>
            						</div>
          					</div>
          					<div className={styles.row}>
            						<div className={styles.card}>
              							<div className={styles.header}>
                								<div className={styles.text}>Number of Courses</div>
              							</div>
              							<div className={styles.body1}>
                								<div className={styles.textBoxParent}>
                  									<div className={styles.textBox}>
                    										<input type="text" className={styles.textBoxInput} maxLength={1} defaultValue="4" />
                  									</div>
													<img className={`f${styles.checkIcon} ${styles.pushDown}`} alt="" src="/Check.svg" />
                								</div>
              							</div>
            						</div>
            						<div className={styles.card}>
              							<div className={styles.header1}>
                								<div className={styles.text}>Current Information</div>
              							</div>
              							<div className={styles.body2}>
                								<div className={styles.infoParent}>
                  									<img className={styles.infoIcon} alt="" src="/Info.svg" />
                  									<div className={styles.text}>GPA: 3.58</div>
                  									<div className={styles.text}>Total Credits: 82</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.card}>
              							<div className={styles.header1}>
                								<div className={styles.text}>Hypothetical Information</div>
              							</div>
              							<div className={styles.body2}>
                								<div className={styles.infoParent}>
                  									<img className={styles.infoIcon} alt="" src="/Info.svg" />
                  									<div className={styles.text}>GPA: 3.63</div>
                  									<div className={styles.text}>Total Credits: 94</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.bottom}>
          					<div className={styles.courseColumns}>
            						<div className={styles.text}>Course Title (optional)</div>
            						<div className={styles.text}>Grade</div>
            						<div className={styles.text}>Credits</div>
          					</div>
          					<div className={styles.divider} />
          					<div className={styles.bottom}>
            						<div className={styles.course}>
              							<div className={styles.courseTitle}>
                							<input type="text" className={styles.courseTitleInput} maxLength={16}/>
              							</div>
										<div className={styles.grade1}>
											<input type="text" className={styles.gradeInput} maxLength={2} defaultValue="A" />
										</div>
              							<div className={styles.credits1}>
										  <input type="text" className={styles.creditsInput} maxLength={1} defaultValue="3"/>
              							</div>
            						</div>
            						<div className={styles.course}>
              							<div className={styles.courseTitle}>
										  <input type="text" className={styles.courseTitleInput} maxLength={16}/>
              							</div>
              							<div className={styles.grade1}>
										  <input type="text" className={styles.gradeInput} maxLength={2} defaultValue="A" />	
										</div>
              							<div className={styles.credits1}>
											<input type="text" className={styles.creditsInput} maxLength={1} defaultValue="3"/>
              							</div>
            						</div>
            						<div className={styles.course}>
              							<div className={styles.courseTitle}>
										  <input type="text" className={styles.courseTitleInput} maxLength={16}/>
              							</div>
              							<div className={styles.grade1}>
											<input type="text" className={styles.gradeInput} maxLength={2} defaultValue="A" />
										</div>
              							<div className={styles.credits1}>
										  <input type="text" className={styles.creditsInput} maxLength={1} defaultValue="3"/>
              							</div>
            						</div>
            						<div className={styles.course}>
              							<div className={styles.courseTitle}>
										  <input type="text" className={styles.courseTitleInput} maxLength={16}/>
              							</div>
              							<div className={styles.grade1}>
										  <input type="text" className={styles.gradeInput} maxLength={2} defaultValue="A" />
										</div>
              							<div className={styles.credits1}>
										  <input type="text" className={styles.creditsInput} maxLength={1} defaultValue="3"/>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StudentWhatIfView;
