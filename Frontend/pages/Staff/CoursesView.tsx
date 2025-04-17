import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Staff/StaffCoursesView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';

const StaffCoursesView:FunctionComponent = () => {
  	
	const router = useRouter();

	const onDepartmentClick = useCallback(() => {
		router.push("/Staff/DepartmentView")
	}, []);

  	const onCoursesClick = useCallback(() => {
		router.push("/Staff/CoursesView");
  	}, []);

    const onSectionsClick = useCallback(() => {
		router.push("/Staff/SectionsView");
	}, []);

	const onInstructorClick = useCallback(() => {
		router.push("/Staff/InstructorView");
	}, []);

	const onRegistrationClick = useCallback(() => {
		router.push("/Staff/SearchInstructors");
	}, []);

	const onStudentsClick = useCallback(() => {
		router.push("/Staff/StudentsView");
	}, []);

	const onAdvisorsClick = useCallback(() => {
		router.push("/Staff/AdvisorView");
	}, []);

	const onLogoutClick = useCallback(() => {
		document.cookie = "auth=; Max-Age=0; path=/";
		document.cookie = "id=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
	// State for course data
	const [rowData, setRowData] = useState([]);
	
	// Column definitions for Ag-Grid
	const columnDefs = [
		{ headerName: "Title", field: "title", },
		{ headerName: "Course", field: "course",  },
		{ headerName: "Credits", field: "credits", },
		{ headerName: "Major", field: "major", },
		{ 
			headerName: "Actions",
			field: "actions",
			cellRenderer: CustomButtonComponent,
			flex: 1,
			cellStyle: { textAlign: "center" },
		},
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
			const response = await fetch('http://localhost:8080/user/staff/courses', {
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

					course_list.push({
                        title: result[i.toString()].courseName, 
                        course: result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber, 
                        credits: result[i.toString()].credits, 
                        major: result[i.toString()].major});
                }
			}
			setRowData(course_list);
		}

		checkAuth();
		getCourses();
	}, []);

	const addCourses = async () => {
		var cookies = document.cookie.split(";");
		const response = await fetch('http://localhost:8080/user/staff/courses/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				"auth": cookies[0].substring(5),
				"id": cookies[1].substring(4),
				"courseName": document.getElementById("courseName").value,
				"coursePrefix": document.getElementById("coursePrefix").value,
				"courseNumber": Number(document.getElementById("courseNumber").value),
				"credits": Number(document.getElementById("credits").value),
				"major": document.getElementById("major").value
			  })
        });
		const result = await response.json();
		alert(result.message);
		router.reload();
	}

  	return (
    		<div className={styles.staffCoursesView}>
      			<div className={styles.tab}>
        				<div className={styles.left}>
          					<div className={styles.button} onClick={onDepartmentClick}>
            						<div className={styles.text}>Department</div>
          					</div>
          					<div className={styles.button1} onClick={onCoursesClick}>
            						<div className={styles.text}>Courses</div>
            						<div className={styles.buttonChild} />
          					</div>
							<div className={styles.button} onClick={onSectionsClick}>
            						<div className={styles.text}>Sections</div>
          					</div>
          					<div className={styles.button} onClick={onInstructorClick}>
            						<div className={styles.text}>Modify Instructors</div>
          					</div>
          					<div className={styles.button} onClick={onRegistrationClick}>
            						<div className={styles.text}>Register Instructors</div>
          					</div>
          					<div className={styles.button} onClick={onStudentsClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.button} onClick={onAdvisorsClick}>
            						<div className={styles.text}>Advisors</div>
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
              							<div className={styles.text}>New Course</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Title:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="courseName" type="text" placeholder="e.g., Intro to Taking Classes" maxLength={30} />
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Prefix:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="coursePrefix" type="text" placeholder="e.g., EDU" maxLength={3} />
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Number:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="courseNumber" type="text" placeholder="e.g., 1004" maxLength={4} />
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Credits:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="credits" type="text" placeholder="e.g., 3" maxLength={1} />
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Major(s):</div>
                								<input className={styles.typeCoursePrefixWrapper} id="major" type="text" placeholder="e.g., Computer Science" />
              							</div>
              							<div className={styles.button6} onClick={addCourses}>
                								<div className={styles.text}>Create</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.divider}>
          					<div className={styles.dividerChild} />
        				</div>
        				<div className={styles.rightSide}>
          					<div className={styles.coursesCard}>
            						<div className={styles.header}>
              							<div className={styles.text}>Courses</div>
            						</div>
            						<div className={styles.body1}>
              							<div className={styles.bodylist}>
											<div
												className="ag-theme-alpine"
												style={{ height: "700px", width: "100%" }}
												>
												<AgGridReact
													rowData={rowData}
													columnDefs={columnDefs}
													pagination={true}
													paginationPageSize={15}
													defaultColDef={{
														sortable: true,
														filter: true,
														editable: true,
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

export default StaffCoursesView;
