import React, { FunctionComponent, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from '../../styles/Instructors/InstructorAllCoursesView.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const InstructorAllCoursesView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const onScheduleClick = useCallback(() => {
		router.push("/Instructors/CurrentCoursesView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Instructors/AllCoursesView");
  	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "id=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
	const getSemesterString = (semester, year) => {
		let semesterName;
	
		switch (semester) {
			case 1:
				semesterName = "Spring";
				break;
			case 2:
				semesterName = "Summer";
				break;
			case 3:
				semesterName = "Fall";
				break;
			default:
				return "Invalid semester";
		}
	
		return `${semesterName} ${year}`;
	};

	// Semester Data
    const [semesterData, setSemesterData] = useState([
        {
            semester: "Spring 2025",
            courses: [
                { course: "CAP 4662 - Introduction to Robotics", credits: 3.0, grade: "IP" },
                { course: "CIS 4301 - Information Systems", credits: 4.0, grade: "IP" },
            ],
        },
        {
            semester: "Fall 2024",
            courses: [
                { course: "CAP 4662 - Introduction to Robotics", credits: 3.0, grade: "A" },
                { course: "CEN 3031 - Introduction to Software Engineering", credits: 3.0, grade: "A" },
            ],
        },
        {
            semester: "Fall 2022",
            courses: [
                { course: "CAP 4662 - Introduction to Robotics", credits: 3.0, grade: "A" },
                { course: "COP 4600 - Operating Systems", credits: 3.0, grade: "A" },
            ],
        },
    ]);

    // AG Grid Column Definitions
    const columnDefs = [
		{ headerName: "Course", field: "course", sortable: true, filter: true, flex: 1, headerStyle: { textAlign: 'center' } },
		{ headerName: "Credits", field: "credits", sortable: true, filter: true, flex: 1, headerStyle: { textAlign: 'center' } },
		{ headerName: "Average Grade", field: "grade", sortable: true, filter: true, flex: 1, headerStyle: { textAlign: 'center' } },
	];	

	const onPageload = useEffect(() => {
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
			return result.status === "success";
		}

	const getCourses = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/instructor/courses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			var course_list = []
			if (result.status === "success")
			{
				const semesterMapping = {
					1: "Spring",
					2: "Summer",
					3: "Fall",
					4: "Winter" // Add more if needed
				};
				
				const transformedData = Object.values(result).reduce((acc, course) => {
					if (typeof course === 'object' && !Array.isArray(course)) {
						// Get the semester name from the mapping
						const semesterName = semesterMapping[course.semester];
						const semesterYear = `${semesterName} ${course.year}`;
						
						let semesterEntry = acc.find(entry => entry.semester === semesterYear);
						if (!semesterEntry) {
							semesterEntry = { semester: semesterYear, courses: [] };
							acc.push(semesterEntry);
						}
				
						semesterEntry.courses.push({
							course: `${course.coursePrefix} ${course.courseNumber} - ${course.courseName}`,
							credits: course.credits,
							grade: course.averageGrade, // Ensure grade is treated as a string
						});
					}
					return acc;
				}, []);
				
				const sortedData = transformedData.sort((a, b) => {
					const semesterOrder = {
						"Spring": 1,
						"Summer": 2,
						"Fall": 3,
						"Winter": 4 // If you have a Winter semester, add it here
					};
				
					const [semesterA, yearA] = a.semester.split(' ');
					const [semesterB, yearB] = b.semester.split(' ');
				
					// Sort by year in descending order
					if (yearA !== yearB) {
						return yearB - yearA; // Newest year first
					}
				
					// If years are the same, sort by semester in the defined order (latest semester first)
					return semesterOrder[semesterB] - semesterOrder[semesterA]; // Change the order here
				});
				
				// Set the sorted data to state
				setSemesterData(sortedData);
				
				
				
			}

		}

		checkAuth();
		getCourses();
	}, []);


  	return (
    		<div className={styles.instructorAllCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onScheduleClick}>
            						<div className={styles.text}>Current Courses</div>
          					</div>
          					<div className={styles.button1} onClick={onCoursesClick}>
            						<div className={styles.text}>All Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
        				</div>
        				<div className={styles.button} onClick={onLogoutClick}>
          					<div className={styles.text}>Logout</div>
        				</div>
      			</div>
      			<div className={styles.body}>
				  {/* Vertically stack grids */}
				  {semesterData.length > 0 ? (
					<div style={{ display: "flex", flexDirection: "column", gap: "30px", width: "100%" }}>
						{semesterData.map((semester, index) => (
							<div key={index} style={{ width: "100%" }}>
							{/* Title Box */}
							<div
								style={{
									boxShadow: "4px 4px 0px #000",
									backgroundColor: "#EA526F",
									border: "2px solid #000",
									padding: "10px",
									textAlign: "center",
								}}
							>
								<h3 style={{ margin: 0 }}>{semester.semester}</h3>
							</div>
							{/* AG Grid Box */}
							<div
								style={{
									boxShadow: "4px 4px 0px #000",
									backgroundColor: "#f7f7ff",
									border: "2px solid #000",
									padding: "10px",
									boxSizing: "border-box",
								}}
							>
								<div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
									<AgGridReact
										rowData={semester.courses}
										columnDefs={columnDefs}
										defaultColDef={{
											flex: 1,
											minWidth: 100,
										}}
									/>
								</div>
							</div>
							</div>
						))}
					</div>
				) : (
				<div className={styles.info}>
					<img className={styles.infoIcon} alt="" src="/Info.svg" />
					<b className={styles.text3}>No Courses Available</b>
				</div>
			)}
		</div>
	</div>
	);
};

export default InstructorAllCoursesView;
