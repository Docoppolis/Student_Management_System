import React from 'react';
import styles from '../../styles/Students/StudentScheduleView.module.css';

const CourseComponent = ({location, time, name, code}) => {
    return (<div className={styles.frameParent}>
    <div className={styles.introductionToRoboticsWrapper}>
          <div className={styles.introductionToRobotics}>{name}</div>
    </div>
    <div className={styles.cap4662}>{code}</div>
    <div className={styles.pm445pm}>{time} @ {location}</div>
</div>);
};

export default CourseComponent;