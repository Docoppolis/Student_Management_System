import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Advisors/AdvisorSearchCoursesView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getClassTimeBlock } from "../../util/timeBlockUtil";

const AdvisorSearchCoursesView:FunctionComponent = () => {
  	
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
  	
	const [columnDefs, setColumnDefs] = useState ([
		{
			headerName: "Course Code",
			field: "courseCode",
			filter: "agTextColumnFilter", // Text filter for course code
		},
		{
			headerName: "Course Title",
			field: "courseTitle",
		},
		{
			headerName: "Instructor",
			field: "instructor",
		},
		{
			headerName: "Room",
			field: "room",
		},
		{
			headerName: "Schedule",
			field: "schedule",
			flex: 2,
		},
		{
			headerName: "Seats",
			field: "seats",
		},
		{
			headerName: "Term",
			field: "term",
		},
		{
			headerName: "Credits",
			field: "credits",
		},
		{
			headerName: "CRN",
			field: "crn",
		},
	]);
	

    const [rowData, setRowData] = useState ([]);

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
			const response = await fetch('http://localhost:8080/user/advisor/courses', {
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
					course_list.push({
						courseCode: result[i.toString()].coursePrefix + result[i.toString()].courseNumber, 
						courseTitle: result[i.toString()].courseName, 
						room: result[i.toString()].building + result[i.toString()].room, 
						instructor: result[i.toString()].instructor, 
						schedule: getClassTimeBlock(result[i.toString()].time), 
						seats: result[i.toString()].seats.toString() + "/" + result[i.toString()].maxSeats.toString(), 
						term: result[i.toString()].term, 
						credits: result[i.toString()].credits, 
						crn: result[i.toString()].crn
					});

			}
			setRowData(course_list);
		}

		checkAuth();
		getCourses();
	}, []);

  	return (
    		<div className={styles.advisorSearchCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onSearchCoursesClick}>
            						<div className={styles.text}>Search Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.logout} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
          					</div>
          					<div className={styles.logout} onClick={onStudentClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.logout} onClick={onWhatIfClick}>
            						<div className={styles.text}>What-If Analysis</div>
          					</div>
        				</div>
        				<div className={styles.logout} onClick={onLogoutClick}>
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
										  <div className="ag-theme-alpine" style={{ height: '700px', width: '100%' }}>
											<AgGridReact
												columnDefs={columnDefs}
												rowData={rowData}
												pagination={true}
												defaultColDef={{
													sortable: true, // Enable sorting on all columns
													filter: true,   // Enable filtering on all columns
													flex: 1,
												}}
												/>
											</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default AdvisorSearchCoursesView;
