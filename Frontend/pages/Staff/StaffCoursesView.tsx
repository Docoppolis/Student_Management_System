import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffCoursesView.module.css';


const StaffCoursesView:FunctionComponent = () => {
  	
  	const onButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.staffCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Department</div>
          					</div>
          					<div className={styles.button1}>
            						<div className={styles.text}>Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Modify Instructors</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Register Instructors</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Advisors</div>
          					</div>
        				</div>
        				<div className={styles.button} onClick={onButtonContainerClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.pageBody}>
        				<div className={styles.leftSide}>
          					<div className={styles.filtersCard}>
            						<div className={styles.header}>
              							<div className={styles.text}>New Course</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Title:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>Intro to Taking Classes</div>
                								</div>
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Prefix:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>EDU</div>
                								</div>
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Number:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>1004</div>
                								</div>
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Credits:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>3</div>
                								</div>
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Major(s):</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>CSE, CS, PHY</div>
                								</div>
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
                  									<div className={styles.edit}>
                    										<img className={styles.icon} alt="" src="/Icon.svg" />
                  									</div>
                  									<img className={styles.minusIcon} alt="" src="/Minus.svg" />
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

export default StaffCoursesView;
