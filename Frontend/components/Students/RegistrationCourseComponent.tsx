import React from 'react';
import styles from '@/styles/Students/StudentRegistrationView.module.css';

const RegistrationCourseComponent = ({code, credits, title, crn, date}) => {
    return (<div className={styles.rows}>
        <div className={styles.header1}>
              <div className={styles.abbreviation}>
                    <div className={styles.text}>{code}</div>
              </div>
              <div className={styles.divider1}>
                    <div className={styles.dividerChild} />
              </div>
              <div className={styles.abbreviation}>
                    <div className={styles.text}>{title}</div>
              </div>
              <div className={styles.divider1}>
                    <div className={styles.dividerChild} />
              </div>
              <div className={styles.abbreviation}>
                    <div className={styles.text}>{credits}</div>
              </div>
              <div className={styles.divider1}>
                    <div className={styles.dividerChild} />
              </div>
              <div className={styles.abbreviation}>
                    <div className={styles.text}>{date}</div>
              </div>
              <div className={styles.divider1}>
                    <div className={styles.dividerChild} />
              </div>
              <div className={styles.abbreviation}>
                    <div className={styles.text}>{crn}</div>
              </div>
        </div>
  </div>);
};

export default RegistrationCourseComponent;