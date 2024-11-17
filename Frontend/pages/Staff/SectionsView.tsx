import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffSectionsView.module.css';
import { useRouter } from 'next/router';

const StaffSectionsView:FunctionComponent = () => {
  	
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
        <div className={styles.staffCoursesView}>
        <div className={styles.tab}>
              <div className={styles.left}>
                    <div className={styles.button} onClick={onDepartmentClick}>
                          <div className={styles.text}>Department</div>
                    </div>
                    <div className={styles.button} onClick={onCoursesClick}>
                          <div className={styles.text}>Courses</div>
                    </div>
                    <div className={styles.button1} onClick={onSectionsClick}>
                          <div className={styles.text}>Sections</div>
                          <div className={styles.buttonChild} />
                    </div>
                    <div className={styles.button} onClick={onInstructorClick}>
                          <div className={styles.text}>Modify Instructors</div>
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
                                <div className={styles.text}>Search Course</div>
                          </div>
                          <div className={styles.body}>
                                <div className={styles.coursePrefix}>
                                      <div className={styles.text}>Prefix:</div>
                                      <input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., EDU" maxLength={3} />
                                </div>
                                <div className={styles.coursePrefix}>
                                      <div className={styles.text}>Number:</div>
                                      <input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 1004" maxLength={4} />
                                </div>
                          </div>
                    </div>
                    <div className={styles.filtersCard}>
                        <div className={styles.header}>
                            <div className={styles.text}>New Course</div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.coursePrefix}>
                                <div className={styles.text}>Title:</div>
                                <input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Intro to Taking Classes" maxLength={30} />
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
                                <div className={styles.text}>Courses</div>
                          </div>
                          <div className={styles.body1}>
                                <div className={styles.bodylist}>
                                      <div className={styles.course}>
                                            <div className={styles.edu1004}>
                                                  <div className={styles.title}>
                                                        <div className={styles.text}>Intro To Taking Classes</div>
                                                  </div>
                                                  <div className={styles.divider1}>
                                                        <div className={styles.dividerItem} />
                                                  </div>
                                                  <div className={styles.title}>
                                                        <div className={styles.text}>EDU1004</div>
                                                  </div>
                                                  <div className={styles.divider1}>
                                                        <div className={styles.dividerItem} />
                                                  </div>
                                                  <div className={styles.title}>
                                                        <div className={styles.text}>3 credits</div>
                                                  </div>
                                                  <div className={styles.divider1}>
                                                        <div className={styles.dividerItem} />
                                                  </div>
                                                  <div className={styles.title}>
                                                        <div className={styles.text}>CSE, CS, PHY</div>
                                                  </div>
                                                  <div className={styles.divider1}>
                                                        <div className={styles.dividerItem} />
                                                  </div>
                                                  <div className={styles.title}>
                                                        <div className={styles.text}>12345</div>
                                                  </div>
                                            </div>
                                            <img className={`${styles.icon} ${styles.pushDown}`} alt="" src="/Icon.svg" />
                                            <img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" />
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

export default StaffSectionsView;