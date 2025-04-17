import React from 'react';
import styles from '@/styles/Students/StudentWhatIfView.module.css';

const WhatIfCourseComponent = ({name, onChange}) => {
    return (<div className={styles.course}>
        <div className={styles.courseTitle}>
          <input type="text" className={styles.courseTitleInput} maxLength={16}/>
        </div>
      <div className={styles.grade1}>
          <input type="text" id={name} name ={name} className={styles.gradeInput} maxLength={1} defaultValue="A" onChange={onChange}  />
      </div>
        <div className={styles.credits1}>
        <input type="text" id={name + 'c'} name={name} className={styles.creditsInput} maxLength={1} defaultValue="3" onChange={onChange}/>
        </div>
  </div>);
};

export default WhatIfCourseComponent;
