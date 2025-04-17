import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Students/StudentWhatIfView.module.css';
import { useRouter } from 'next/router';
import WhatIfCourseComponent from '@/components/Students/WhatIfCourseComponent';
//import ReactDOMServer, { renderToString } from 'react-dom/server';

const StudentWhatIfView:FunctionComponent = () => {
  	
    const router = useRouter();
	const [numcourses, setnumcourses] = useState(4);
	const [gpa, setgpa] = useState(3.5);
	const [totalcredits, setcredits] = useState(80);

	const onScheduleClick = useCallback(() => {
		router.push("/Students/Schedule")
	}, []);

  	const onDegreeProgressClick = useCallback(() => {
		router.push("/Students/DegreeProgressView");
  	}, []);

	const onSearchClick = useCallback(() => {
	router.push("/Students/SearchCoursesInputView");
	}, []);

	const onRegistrationClick = useCallback(() => {
		router.push("/Students/RegistrationView");
	}, []);

	const onWhatifClick = useCallback(() => {
		router.push("/Students/WhatIfView");
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "id=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
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

	const onGradeChange = (event) => {
		var points = 0;
		var credits = 0;
		for (var i = 0; i < document.getElementById("numcourses").value; i++)
		{
			credits += Number(document.getElementById("course" + i + "c").value);
			points += gradeToGPA(document.getElementById("course" + i).value) * Number(document.getElementById("course" + i + "c").value);
		}
		document.getElementById("hypothetical gpa").textContent = "GPA: " + ((points + (totalcredits * gpa)) / (credits + totalcredits)).toFixed(2);
		document.getElementById("hypothetical credits").textContent = "Total Credits: " + (credits + totalcredits);
	}

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
		   if (result.status === "success" && result.usertype == 0)
		   {
				const response = await fetch('http://localhost:8080/user/student/whatif', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
				});
				const result = await response.json();
				if (result.status === "success")
				{
					setgpa(result.gpa);
					setcredits(result.credits);
				}
		   }
	   	}
		checkAuth();
		onGradeChange(null);
	});

	const buttonDown = useCallback(async () => {
		setnumcourses(document.getElementById("numcourses").value);
	}, []);

  	return (
    		<div className={styles.studentWhatIfView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Schedule</div>
          					</div>
          					<div className={styles.button} onClick={onDegreeProgressClick}>
            						<div className={styles.text}>Degree Progress</div>
          					</div>
          					<div className={styles.button} onClick={onSearchClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.button} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
          					</div>
          					<div className={styles.button4} onClick={onWhatifClick}>
            						<div className={styles.text}>What-if Analysis</div>
            						<div className={styles.buttonChild} />
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
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
          					<div className={styles.row}>
            						<div className={styles.card}>
              							<div className={styles.header}>
                								<div className={styles.text}>Number of Courses</div>
              							</div>
              							<div className={styles.body1}>
                								<div className={styles.textBoxParent}>
                  									<div className={styles.textBox}>
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
                  									<div className={styles.text}>Total Credits: {totalcredits}</div>
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
        				<div className={styles.bottom}>
          					<div className={styles.courseColumns}>
            						<div className={styles.text}>Course Title (optional)</div>
            						<div className={styles.text}>Grade</div>
            						<div className={styles.text}>Credits</div>
          					</div>
          					<div className={styles.divider} />
          					<div className={styles.bottom} id="courselist">
									{Array.from({ length: numcourses }, (_, index) =>
									(
										<WhatIfCourseComponent name={"course" + index} onChange={onGradeChange}/>
									))}
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default StudentWhatIfView;
