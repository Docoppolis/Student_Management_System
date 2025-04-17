import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Advisors/AdvisorWhatIfView.module.css';
import { useRouter } from 'next/router';
import WhatIfCourseComponent from '@/components/Students/WhatIfCourseComponent';

const AdvisorWhatIfView:FunctionComponent = () => {
  	
    const router = useRouter();  	

    const onSearchCoursesClick = useCallback(() => {
        router.push("/Advisors/SearchCoursesView")
    }, []);

    const onRegistrationClick = useCallback(() => {
        router.push("/Advisors/RegistrationView")
    }, []);

    const onStudentClick = useCallback(() => {
        router.push("/Advisors/StudentView")
    }, []);

    const onWhatIfClick = useCallback(() => {
        router.push("/Advisors/WhatIfView")
    }, []);

    const onLogoutClick = useCallback(() => {
        document.cookie = "auth=; Max-Age=0; path=/";
        document.cookie = "id=; Max-Age=0; path=/";
        router.push("/");
    }, []);

    const [stuedntName, setStudentName] = useState ("Greg Heffley");
    const [major, setMajor] = useState ("CSE" );
    const [creditsHours, setCreditsHours] = useState (15);
    const [maxCreditsHours, setMaxCreditsHours] = useState (120);
    const [gpa, setGPA] = useState (4.0);
    const [numcourses, setnumcourses] = useState(4);

    useEffect(() => {
		const checkAuth = async () => {
		    if (document.cookie.length === 0)
			   return;
		   var cookies = document.cookie.split(";");
		   if (cookies.length != 2)
		   {
			   document.cookie = "auth=; Max-Age=0; path=/";
			   document.cookie = "id=; Max-Age=0; path=/";
			   return;
		   }
		   const response = await fetch('http://localhost:8080/user/validate', {
			   method: 'POST',
			   headers: {
				   'Content-Type': 'application/json',
			   },
			   body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
		   });
		    const result = await response.json();
		   if (result.status === "success")
		   {
				
		   }
	   	}

		checkAuth();
		onGradeChange(null);
	});

    const submitStudent = async () => {
        var cookies = document.cookie.split(";");
        const response = await fetch('http://localhost:8080/user/advisor/whatif', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "uid":document.getElementById("uid").value})
        });
        const result = await response.json();
        if (result.status === "success")
        {
            setGPA(result.gpa);
            setCreditsHours(result.credits);
            setStudentName(result.name);
            setMajor(result.major);
        }
        else
        {
            alert("Invalid student ID");
        }
    }

    const gradeToGPA = (grade) => {
		switch (grade.toUpperCase())
		{
			case 'A':
				return 4.0;
			case 'B':
				return 3.0;
			case 'C':
				return 2.0;
			case 'D':
				return 1.0;
			case 'F':
				return 0.0;
			default:
				return 0.0;
		}
	}

    const onGradeChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        let points = 0;
        let credits = 0;
    
        // Get the value of the numcourses input
        const numCoursesInput = document.getElementById("numcourses") as HTMLInputElement | null;
        const numCourses = numCoursesInput?.value ? parseInt(numCoursesInput.value, 10) : 0;
    
        for (let i = 0; i < numCourses; i++) {
            const courseGradeInput = document.getElementById(`course${i}`) as HTMLInputElement | null;
            const courseCreditsInput = document.getElementById(`course${i}c`) as HTMLInputElement | null;
    
            // Safely access values and calculate only if inputs exist
            const courseGrade = courseGradeInput?.value || "F";
            const courseCredits = courseCreditsInput?.value ? Number(courseCreditsInput.value) : 0;
    
            credits += courseCredits;
            points += gradeToGPA(courseGrade) * courseCredits;
        }
    
        // Update hypothetical GPA and credits text only if elements exist
        const hypotheticalGPAElement = document.getElementById("hypothetical gpa");
        const hypotheticalCreditsElement = document.getElementById("hypothetical credits");
    
        if (hypotheticalGPAElement && hypotheticalCreditsElement) {
            hypotheticalGPAElement.textContent =
                "GPA: " + ((points + creditsHours * gpa) / (credits + creditsHours)).toFixed(2);
            hypotheticalCreditsElement.textContent = "Total Credits: " + (credits + creditsHours);
        }
    };
    
    const buttonDown = useCallback(() => {
        // Safely access the numcourses input
        const numCoursesInput = document.getElementById("numcourses") as HTMLInputElement | null;
    
        // Update state only if input exists
        if (numCoursesInput) {
            setnumcourses(parseInt(numCoursesInput.value, 10) || 0);
        }
    }, []);
    

    const [studentID, setStudentID] = useState(''); // Track Student ID input
    const [isVisible, setIsVisible] = useState(false); // Visibility of Info and Progress sections

    const handleCheckClick = useCallback(async () => {
        if (studentID.trim()) {
            // Simulate fetching student info (replace with actual logic)
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [studentID]);

    return (
        <div className={styles.page}>
            <div className={styles.tab}>
                <div className={styles.buttonParent}>
                    <div className={styles.button} onClick={onSearchCoursesClick}>
                        <div className={styles.text}>Search Courses</div>
                    </div>
                    <div className={styles.button} onClick={onRegistrationClick}>
                        <div className={styles.text}>Registration</div>
                    </div>
                    <div className={styles.button} onClick={onStudentClick}>
                        <div className={styles.text}>Students</div>
                    </div>
                    <div className={styles.button1} onClick={onWhatIfClick}>
                        <div className={styles.text}>What-If Analysis</div>
                        <div className={styles.buttonChild} />
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
                            <div className={styles.text}>Enter Student ID</div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.columns}>
                                <div className={styles.textBox}>
                                    <input 
                                        type="text" 
                                        id="uid" 
                                        value={studentID}
                                        onChange={(e) => setStudentID(e.target.value)}
                                        className={styles.textBoxInput} 
                                        maxLength={9} 
                                        placeholder="Enter ID" 
                                    />
                                </div>
                                <img 
                                    className={`f${styles.checkIcon} ${styles.pushDown}`} 
                                    alt="" 
                                    src="/Check.svg" 
                                    onClick={() => {
                                        submitStudent();
                                        handleCheckClick();
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {isVisible && (
                        <div className={styles.filtersCard}>
                            <div className={styles.header}>
                                <div className={styles.text}>Student Info</div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.row}>
                                    <div className={styles.textItem}>Name: {stuedntName}</div>
                                    <div className={styles.textItem}>Major: {major}</div>
                                    <div className={styles.textItem}>Credit Hours: {creditsHours}/{maxCreditsHours}</div>
                                    <div className={styles.textItem}>GPA: {gpa}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.divider}>
                    <div className={styles.dividerChild} />
                </div>
                
                {isVisible && (
                    <div className={styles.rightSide}>
                        <div className={styles.top}>
                            <div className={styles.instructions}>
                                <img className={styles.infoIcon} alt="" src="/Info.svg" />
                                <div className={styles.textParent}>
                                    <i className={styles.text6}>Analyze what your GPA would be based on the grades you earn in future classes</i>
                                    <div className={styles.text}>
                                            <ul className={styles.selectTheNumberOfClassesT}>
                                                <li>Select the number of classes to test</li>
                                            </ul>
                                    </div>
                                    <div className={styles.text}>
                                            <ul className={styles.selectTheNumberOfClassesT}>
                                                <li>Choose the number of credit hours per course</li>
                                            </ul>
                                    </div>
                                    <div className={styles.text}>
                                            <ul className={styles.selectTheNumberOfClassesT}>
                                                <li>Choose the grade earned in each course</li>
                                            </ul>
                                    </div>
                                    <div className={styles.text}>
                                            <ul className={styles.selectTheNumberOfClassesT}>
                                                <li>View the GPA you would have after earning those grades in those courses</li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.columns}>
                                <div className={styles.card}>
                                    <div className={styles.header1}>
                                        <div className={styles.text}>Number of Courses</div>
                                    </div>
                                    <div className={styles.body1}>
                                        <div className={styles.textBoxParent}>
                                            <div className={styles.textBox1}>
                                                <input type="text" id="numcourses" className={styles.textBoxInput} maxLength={1} defaultValue="4" />
                                            </div>
                                            <img className={`f${styles.checkIcon} ${styles.pushDown}`} alt="" src="/Check.svg" onClick={buttonDown}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.header1}>
                                        <div className={styles.text}>Current Information</div>
                                    </div>
                                    <div className={styles.body2}>
                                        <div className={styles.infoParent}>
                                            <img className={styles.infoIcon} alt="" src="/Info.svg" />
                                            <div className={styles.text}>GPA: {gpa.toFixed(2)}</div>
                                            <div className={styles.text}>Total Credits: {creditsHours}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.header1}>
                                        <div className={styles.text}>Hypothetical Information</div>
                                    </div>
                                    <div className={styles.body2}>
                                        <div className={styles.infoParent}>
                                            <img className={styles.infoIcon} alt="" src="/Info.svg" />
                                            <div className={styles.text} id="hypothetical gpa">GPA: 4.00</div>
                                            <div className={styles.text} id="hypothetical credits">Total Credits: 12</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.divider}>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.courseColumns}>
                                <div className={styles.text}>Course Title (optional)</div>
                                <div className={styles.text}>Grade</div>
                                <div className={styles.text}>Credits</div>
                            </div>
                            <div className={styles.dividerHorizontal}></div>
                            <div className={styles.bottom} id="courselist">
                                {Array.from({ length: numcourses }, (_, index) =>
                                (
                                    <WhatIfCourseComponent name={"course" + index} onChange={onGradeChange}/>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvisorWhatIfView;
