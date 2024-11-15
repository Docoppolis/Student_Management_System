import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Students/StudentSearchCoursesInputView.module.css';
import { useRouter } from 'next/router';


const StudentSearchCoursesInputView:FunctionComponent = () => {
  	
    const router = useRouter();  	

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
  	
  	return (
    		<div className={styles.studentSearchcoursesInputView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Schedule</div>
          					</div>
          					<div className={styles.button} onClick={onDegreeProgressClick}>
            						<div className={styles.text}>Degree Progress</div>
          					</div>
          					<div className={styles.button2} onClick={onSearchClick}>
            						<div className={styles.text}>Search Courses</div>
            						<div className={styles.buttonChild} />
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
      			<div className={styles.pageBody}>
        				<div className={styles.leftSide}>
          					<div className={styles.filtersCard}>
            						<div className={styles.header}>
              							<div className={styles.text}>Filters</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.term}>
											<div className={styles.text}>Term:</div>
											<select className={styles.dropdown}>
												<option value="fall2024">Fall 2024</option>
												<option value="spring2025">Spring 2025</option>
												<option value="summer2025">Summer 2025</option>
											</select>
											</div>
											<div className={styles.coursePrefix}>
												<div className={styles.text}>Prefix:</div>
												<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., EDU" maxLength={3} />
											</div>
											<div className={styles.coursePrefix}>
												<div className={styles.text}>Number:</div>
												<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 1004" maxLength={4}/>
											</div>
              							<div className={styles.button5}>
                								<div className={styles.text}>Apply Filters</div>
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
                								<div className={styles.edu1004}>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>EDU1004</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Intro To Taking Classes</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Dr. Professor</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>EGN103</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>M/W 3:30p.m. - 4:45p.m.</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>0/30 Seats Taken</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.f24}>F24</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>3 credits</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>12345</div>
                  									</div>
                								</div>
                								<div className={styles.edu1004}>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>EDU1004</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Intro To Taking Classes</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Dr. Professor</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>EGN103</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>T/TH 3:30p.m. - 4:45p.m.</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>0/30 Seats Taken</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.f24}>F24</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>3 credits</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>65431</div>
                  									</div>
                								</div>
                								<div className={styles.edu1004}>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>EDU1004</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Intro To Taking Classes</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>Dr. Bob</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>ENB204</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>
                      											<p className={styles.mw200pm}>M/W 2:00p.m. - 3:15p.m.</p>
                      											<p className={styles.mw200pm}>F 11:00am - 1:45p.m.</p>
                    										</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>0/30 Seats Taken</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.f24}>F24</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>3 credits</div>
                  									</div>
                  									<div className={styles.divider1}>
                    										<div className={styles.dividerItem} />
                  									</div>
                  									<div className={styles.abbreviation}>
                    										<div className={styles.text}>55544</div>
                  									</div>
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

export default StudentSearchCoursesInputView;
