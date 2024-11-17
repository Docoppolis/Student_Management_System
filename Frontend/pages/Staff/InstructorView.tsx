import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffInstructorView.module.css';
import { useRouter } from 'next/router';

const StaffInstructorView:FunctionComponent = () => {
  	
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
    		<div className={styles.staffInstructorView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onDepartmentClick}>
            						<div className={styles.text}>Department</div>
          					</div>
          					<div className={styles.button} onClick={onCoursesClick}>
            						<div className={styles.text}>Courses</div>
          					</div>
							<div className={styles.button} onClick={onSectionsClick}>
            						<div className={styles.text}>Sections</div>
          					</div>
          					<div className={styles.button2} onClick={onInstructorClick}>
            						<div className={styles.text}>Modify Instructors</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onRegistrationClick}>
            						<div className={styles.text}>Register Instructors</div>
          					</div>
          					<div className={styles.button} onClick={onStudentsClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.button} onClick={onAdvisorsClick}>
            						<div className={styles.text}>Advisors</div>
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.pageBody}>
        				<div className={styles.leftSide}>
          					<div className={styles.filtersCard}>
            						<div className={styles.header}>
              							<div className={styles.text}>New Instructor</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.fname}>
                								<div className={styles.text}>First Name:</div>
                								<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Bob" maxLength={10} />
              							</div>
              							<div className={styles.fname}>
                								<div className={styles.text}>Last Name:</div>
                								<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Smith" maxLength={10} />
              							</div>
              							<div className={styles.fname}>
                								<div className={styles.text}>Phone:</div>
                								<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 2203" maxLength={4} />
              							</div>
              							<div className={styles.button6}>
                								<div className={styles.text}>Create</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.divider}>
          					<div className={styles.dividerChild} />
        				</div>
        				<div className={styles.rightSide}>
          					<div className={styles.coursesCard}>
            						<div className={styles.header}>
              							<div className={styles.text}>Instructors</div>
            						</div>
            						<div className={styles.body1}>
              							<div className={styles.bodylist}>
                								<div className={styles.headerWrapper}>
                  									<div className={styles.header2}>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>First Name</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>Last Name</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>Phone Number</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>Instructor ID</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.course}>
                  									<div className={styles.edu1004}>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>Bob</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>Smith</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>2203</div>
                    										</div>
                    										<div className={styles.divider1}>
                      											<div className={styles.dividerItem} />
                    										</div>
                    										<div className={styles.abbreviation}>
                      											<div className={styles.text}>T432</div>
                    										</div>
                  									</div>
                  									<img className={`${styles.icon} ${styles.pushDown}`} alt="" src="/Icon.svg" />
                  									<img className={`${styles.minusIcon} ${styles.pushDown}`} alt="" src="/Minus.svg" />
                								</div>
              							</div>
            						</div>
            						<div className={styles.footer}>
              							<div className={styles.text}>{`<- Previous`}</div>
              							<div className={styles.text}>{`Next ->`}</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StaffInstructorView;
