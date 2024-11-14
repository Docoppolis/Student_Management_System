import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffInstructorView.module.css';


const StaffInstructorView:FunctionComponent = () => {
  	
  	const onButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.staffInstructorView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Department</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Courses</div>
          					</div>
          					<div className={styles.button2}>
            						<div className={styles.text}>Modify Instructors</div>
            						<div className={styles.buttonChild} />
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
              							<div className={styles.text}>New Instructor</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.fname}>
                								<div className={styles.text}>First Name:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>Bob</div>
                								</div>
              							</div>
              							<div className={styles.fname}>
                								<div className={styles.text}>Last Name:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>Smith</div>
                								</div>
              							</div>
              							<div className={styles.fname}>
                								<div className={styles.text}>Phone:</div>
                								<div className={styles.typeCoursePrefixWrapper}>
                  									<div className={styles.text}>2203</div>
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

export default StaffInstructorView;
