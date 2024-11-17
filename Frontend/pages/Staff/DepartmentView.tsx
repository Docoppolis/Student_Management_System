import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffDepartmentView.module.css';
import { useRouter } from 'next/router';

const StaffDepartmentView:FunctionComponent = () => {
  	
	const router = useRouter();

	const onDepartmentClick = useCallback(() => {
		router.push("/Staff/DepartmentView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Staff/CoursesView");
  	}, []);

    const onSectionsClick = useCallback(() => {
		router.push("/Staff/SectionsView");
	}, []);

	const onInstructorClick = useCallback(() => {
		router.push("/Staff/InstructorView");
	}, []);

	const onRegistrationClick = useCallback(() => {
		router.push("/Staff/SearchInstructors");
	}, []);

	const onStudentsClick = useCallback(() => {
		router.push("/Staff/StudentsView");
	}, []);

	const onAdvisorsClick = useCallback(() => {
		router.push("/Staff/AdvisorView");
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
  	return (
    		<div className={styles.staffDepartmentView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onDepartmentClick}>
            						<div className={styles.text}>Department</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.logout} onClick={onCoursesClick}>
            						<div className={styles.text}>Courses</div>
          					</div>
							<div className={styles.button} onClick={onSectionsClick}>
            						<div className={styles.text}>Sections</div>
          					</div>
          					<div className={styles.logout} onClick={onInstructorClick}>
            						<div className={styles.text}>Modify Instructors</div>
          					</div>
          					<div className={styles.logout} onClick={onRegistrationClick}>
            						<div className={styles.text}>Register Instructors</div>
          					</div>
          					<div className={styles.logout} onClick={onStudentsClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.logout} onClick={onAdvisorsClick}>
            						<div className={styles.text}>Advisors</div>
          					</div>
        				</div>
        				<div className={styles.logout} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
        				<div className={styles.majorsCard}>
          					<div className={styles.header}>
            						<div className={styles.building}>Majors</div>
          					</div>
          					<div className={styles.body1}>
            						<div className={styles.description}>
              							<div className={styles.text}>Prefix</div>
              							<div className={styles.text}>Required Hours</div>
            						</div>
            						<div className={styles.major}>
              							<div className={styles.textBoxParent}>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>CSE</div>
                								</div>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>120</div>
                								</div>
              							</div>
              							<div className={styles.left}>
										  <img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
              							</div>
            						</div>
            						<div className={styles.major}>
              							<div className={styles.textBoxParent}>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>EE</div>
                								</div>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>136</div>
                								</div>
              							</div>
              							<div className={styles.left}>
											<img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
              							</div>
            						</div>
            						<div className={styles.major}>
              							<div className={styles.textBoxParent}>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>CIV</div>
                								</div>
                								<div className={styles.textBox}>
                  									<div className={styles.text}>118</div>
                								</div>
              							</div>
              							<div className={styles.left}>
										  <img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
              							</div>
            						</div>
            						<div className={styles.major}>
              							<div className={styles.text}>Add New Major</div>
              							<img className={`${styles.plusIcon} ${styles.pushDown}`} alt="Plus Icon" src="/Plus.svg" />
            						</div>
          					</div>
        				</div>
        				<div className={styles.majorsCard}>
          					<div className={styles.header}>
            						<div className={styles.building}>Building</div>
          					</div>
          					<div className={styles.body2}>
            						<div className={styles.textBox}>
              							<div className={styles.text}>ENG</div>
            						</div>
            						<img className={`${styles.checkIcon} ${styles.pushDown}`} alt="Check Icon" src="/Check.svg" />
          					</div>
        				</div>
        				<div className={styles.majorsCard}>
          					<div className={styles.header}>
            						<div className={styles.building}>Office</div>
          					</div>
          					<div className={styles.body2}>
            						<div className={styles.textBox}>
              							<div className={styles.text}>1034</div>
            						</div>
            						<img className={`${styles.checkIcon} ${styles.pushDown}`} alt="Check Icon" src="/Check.svg" />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StaffDepartmentView;
