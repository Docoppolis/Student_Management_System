import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffSearchInstructors.module.css';


const StaffSearchInstructors:FunctionComponent = () => {
  	
  	const onButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.staffSearchInstructors}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Department</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Courses</div>
          					</div>
          					<div className={styles.button} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Modify Instructors</div>
          					</div>
          					<div className={styles.button3} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Register Instructors</div>
            						<div className={styles.buttonChild} />
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
        				<div className={styles.topSection}>
          					<div className={styles.columns}>
            						<div className={styles.card}>
              							<div className={styles.header}>
                								<div className={styles.text}>Enter Instructor ID</div>
              							</div>
              							<div className={styles.body}>
                								<div className={styles.columns}>
                  									<div className={styles.textBox}>
                    										<div className={styles.text}>T1234</div>
                  									</div>
                  									<img className={styles.checkIcon} alt="" src="/Check.svg" />
                								</div>
              							</div>
            						</div>
            						<div className={styles.adddropCard}>
              							<div className={styles.header1}>
                								<img className={styles.checkIcon} alt="" src="/Info.svg" />
                								<div className={styles.text}>Input up to 6 CRNs to add or drop</div>
              							</div>
              							<div className={styles.body1}>
                								<div className={styles.row}>
                  									<div className={styles.textBox}>
                    										<div className={styles.text}>43242</div>
                  									</div>
                  									<div className={styles.textBox2} />
                  									<div className={styles.textBox2} />
                  									<div className={styles.textBox2} />
                  									<div className={styles.textBox2} />
                  									<div className={styles.textBox2} />
                  									<img className={styles.plusIcon} alt="" src="/Plus.svg" />
                  									<img className={styles.plusIcon} alt="" src="/Minus.svg" />
                								</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.divider} />
        				</div>
        				<div className={styles.bottomSection}>
          					<div className={styles.header2}>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Course</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Title</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Credits</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>Registration Date</div>
            						</div>
            						<div className={styles.divider1}>
              							<div className={styles.dividerChild} />
            						</div>
            						<div className={styles.abbreviation}>
              							<div className={styles.text}>CRN</div>
            						</div>
          					</div>
          					<div className={styles.rows}>
            						<div className={styles.header2}>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>EDU1004</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>Intro To Taking Classes</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>3 credits</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>5-16-2024</div>
              							</div>
              							<div className={styles.divider1}>
                								<div className={styles.dividerChild} />
              							</div>
              							<div className={styles.abbreviation}>
                								<div className={styles.text}>43242</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StaffSearchInstructors;
