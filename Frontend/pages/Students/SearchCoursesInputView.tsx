import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Students/StudentSearchCoursesInputView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getClassTimeBlock } from "../../util/timeBlockUtil";

const StudentSearchCoursesInputView: FunctionComponent = () => {
    const router = useRouter();

    const onScheduleClick = useCallback(() => {
        router.push("/Students/Schedule");
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

    const [columnDefs] = useState([
        {
            flex: 1,
            headerName: "Course Code",
            field: "courseCode",
            filter: "agTextColumnFilter", // Text filter for course code
        },
        {
            flex: 1,
            headerName: "Course Title",
            field: "courseTitle",
        },
        {
            flex: 1,
            headerName: "Instructor",
            field: "instructor",
        },
        {
            flex: 1,
            headerName: "Room",
            field: "room",
        },
        {
            flex: 2,
            headerName: "Schedule",
            field: "schedule",
        },
        {
            flex: 1,
            headerName: "Seats",
            field: "seats",
        },
        {
            field: 'term', 
            headerName: 'Term', 
            sortable: true, 
            filter: true, 
            flex: 2, 
            comparator: (valueA, valueB) => {
                // Extract year and season from the term strings
                const parseTerm = (term) => {
                const [season, year] = term.split(' ');
                const seasonOrder = { 'Spring': 1, 'Summer': 2, 'Fall': 3, 'Winter': 4 };
                return { year: parseInt(year, 10), season: seasonOrder[season] };
                };
        
                const termA = parseTerm(valueA);
                const termB = parseTerm(valueB);
        
                // First sort by year
                if (termA.year !== termB.year) {
                return termA.year - termB.year;
                }
        
                // If years are the same, sort by season
                return termA.season - termB.season;
            }
        },
        {
            flex: 1,
            headerName: "Credits",
            field: "credits",
        },
        {
            flex: 1,
            headerName: "CRN",
            field: "crn",
        },
    ]);

    // State for row data
    const [rowData, setRowData] = useState([]);

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
			const response = await fetch('http://localhost:8080/user/student/courses', {
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
				for (var i = 0; i < Object.keys(result).length - 1; i++)
                {
                    const termCode = result[i.toString()].term; // Example: "2 2024"

                    // Split the string into parts
                    const [termNumberString, yearString] = termCode.split(" ");

                    // Convert the parts to numbers
                    const termNumber = parseInt(termNumberString, 10); // Extracts 2
                    const year = parseInt(yearString, 10); // Extracts 2024

                    const termMapping = { 1: "Spring", 2: "Summer", 3: "Fall", 4: "Winter" };
                    const termDisplay = `${termMapping[termNumber]} ${year}`;

					course_list.push({
                        courseCode: result[i.toString()].coursePrefix + result[i.toString()].courseNumber, 
                        courseTitle: result[i.toString()].courseName, 
                        room: result[i.toString()].building + result[i.toString()].room, 
                        instructor: result[i.toString()].instructor, 
                        schedule: getClassTimeBlock(result[i.toString()].time), 
                        seats: result[i.toString()].seats.toString() + "/" + result[i.toString()].maxSeats.toString(), 
                        term: termDisplay, 
                        credits: result[i.toString()].credits, 
                        crn: result[i.toString()].crn
                    });
                }
			}
			setRowData(course_list);
		}

		checkAuth();
		getCourses();
	}, []);

    return (
        <div className={styles.studentSearchcoursesInputView}>
            <div className={styles.tab}>
                <div className={styles.left}>
                    <div className={styles.button} onClick={onScheduleClick}>
                        <div className={styles.text}>Schedule</div>
                    </div>
                    <div className={styles.button} onClick={onDegreeProgressClick}>
                        <div className={styles.text}>Degree Progress</div>
                    </div>
                    <div className={styles.button2} onClick={onSearchClick}>
                        <div className={styles.text}>Search Courses</div>
                        <div className={styles.buttonChild} />
                    </div>
                    <div className={styles.button} onClick={onRegistrationClick}>
                        <div className={styles.text}>Registration</div>
                    </div>
                    <div className={styles.button} onClick={onWhatifClick}>
                        <div className={styles.text}>What-if Analysis</div>
                    </div>
                </div>
                <div className={styles.button} onClick={onLogoutClick}>
                    <div className={styles.text}>Logout</div>
                </div>
            </div>
            <div className={styles.pageBody}>
                <div className={styles.rightSide}>
					<div className={styles.coursesCard}>
						<div className={styles.header}>
							<div className={styles.text}>Courses</div>
						</div>
						<div className={styles.body1}>
							<div className={styles.bodylist}>
							<div className="ag-theme-alpine" style={{ height: '800px', width: '100%' }}>
								<AgGridReact
									columnDefs={columnDefs}
									rowData={rowData}
									pagination={true}
									defaultColDef={{
										sortable: true, // Enable sorting on all columns
										filter: true,   // Enable filtering on all columns
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
};

export default StudentSearchCoursesInputView;
