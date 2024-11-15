import React from 'react';
import styles from '../../styles/Students/StudentDegreeProgressView.module.css';

const DegreeCourseComponent = ({code, credits, term, status}) => {
    return (<div className={styles.entry}>
        <div className={styles.abbreviation}>
              <div className={styles.text}>{code}</div>
        </div>
        <div className={styles.divider}>
              <div className={styles.dividerChild} />
        </div>
        <div className={styles.abbreviation}>
              <div className={styles.text}>{credits}</div>
        </div>
        <div className={styles.divider}>
              <div className={styles.dividerChild} />
        </div>
        <div className={styles.abbreviation}>
              <div className={styles.term1}>{term}</div>
        </div>
        <div className={styles.divider}>
              <div className={styles.dividerChild} />
        </div>
        <div className={styles.abbreviation}>
              <div className={styles.text}>{status}</div>
        </div>
  </div>);
};

export default DegreeCourseComponent;