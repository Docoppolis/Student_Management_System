import React from 'react';
import styles from '@/styles/Students/StudentWhatIfView.module.css';

const WhatIfCourseComponent = ({name}) => {
    return (<div className={styles.course}>
        <div className={styles.courseTitle}>
          <input type="text" className={styles.courseTitleInput} maxLength={16}/>
        </div>
      <div className={styles.grade1}>
          <input type="text" id={name} name ={name} className={styles.gradeInput} maxLength={2} defaultValue="A" />
      </div>
        <div className={styles.credits1}>
        <input type="text" id={name} name={name} className={styles.creditsInput} maxLength={1} defaultValue="3"/>
        </div>
  </div>);
};

export default WhatIfCourseComponent;