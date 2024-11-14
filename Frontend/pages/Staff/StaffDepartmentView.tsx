import { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Staff/StaffDepartmentView.module.css';


const StaffDepartmentView:FunctionComponent = () => {
  	
  	const onButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.staffDepartmentView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button}>
            						<div className={styles.text}>Department</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.logout} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Courses</div>
          					</div>
          					<div className={styles.logout} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Modify Instructors</div>
          					</div>
          					<div className={styles.logout} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Register Instructors</div>
          					</div>
          					<div className={styles.logout} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.logout} onClick={onButtonContainerClick}>
            						<div className={styles.text}>Advisors</div>
          					</div>
        				</div>
        				<div className={styles.logout} onClick={onButtonContainerClick}>
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
                								<img className={styles.minusIcon} alt="" src="/Minus.svg" />
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
                								<img className={styles.minusIcon} alt="" src="/Minus.svg" />
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
                								<img className={styles.minusIcon} alt="" src="/Minus.svg" />
              							</div>
            						</div>
            						<div className={styles.major}>
              							<div className={styles.text}>Add New Major</div>
              							<img className={styles.minusIcon} alt="" src="/Plus.svg" />
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
            						<img className={styles.checkIcon} alt="" src="/Check.svg" />
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
            						<img className={styles.checkIcon} alt="" src="/Check.svg" />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StaffDepartmentView;
