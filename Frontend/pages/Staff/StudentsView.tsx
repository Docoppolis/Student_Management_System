import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Staff/StaffStudentsView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';

const StaffStudentsView:FunctionComponent = () => {
  	
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
	

	// State for student data
	const [rowData, setRowData] = useState([]);
	
	// Column definitions for Ag-Grid
	const columnDefs = [
		{ headerName: "First Name", field: "firstName",  },
		{ headerName: "Last Name", field: "lastName",  },
		{ headerName: "Major", field: "major", flex: 2 },
		{ headerName: "Phone Number", field: "phone", flex: 2,},
		{ headerName: "Student ID", field: "studentId",  },
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
			const response = await fetch('http://localhost:8080/user/staff/students', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			var student_list = []
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 1; i++)
                {
					student_list.push({
						firstName: result[i.toString()].firstName,
						lastName: result[i.toString()].lastName,
						major: result[i.toString()].major,
						phone: result[i.toString()].phone,
						studentId: result[i.toString()].studentId,
					});
                }
			}
			setRowData(student_list);
		}

		checkAuth();
		getCourses();
	}, []);

	const addStudent = async () => {
        var cookies = document.cookie.split(";");
        const response = await fetch('http://localhost:8080/user/staff/students/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "firstName":document.getElementById("firstName").value, "lastName":document.getElementById("lastName").value, "major":document.getElementById("major").value, "phone":Number(document.getElementById("phoneNumber").value)})
        });
        const result = await response.json();
		if (result.status === "failure")
			alert(result.message);
		else
			alert(result.message + "\n" + "Email: " + result.email + "\n" + "Password: " + result.password);
		router.reload();
    }
  	
  	return (
    		<div className={styles.staffStudentsView}>
      			<div className={styles.tab}>
					<div className={styles.left}>
						<div className={styles.button} onClick={onDepartmentClick}>
							<div className={styles.text}>Department</div>
						</div>
						<div className={styles.button} onClick={onCoursesClick}>
							<div className={styles.text}>Courses</div>
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
						<div className={styles.button4} onClick={onStudentsClick}>
							<div className={styles.text}>Students</div>
							<div className={styles.buttonChild} />
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
								<div className={styles.text}>New Student</div>
							</div>
							<div className={styles.body}>
								<div className={styles.fname}>
										<div className={styles.text}>First Name:</div>
										<input id="firstName" className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Bob" maxLength={10} />
								</div>
								<div className={styles.fname}>
										<div className={styles.text}>Last Name:</div>
										<input id="lastName" className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Smith" maxLength={10} />
								</div>
								<div className={styles.fname}>
										<div className={styles.text}>Major:</div>
										<input id="major" className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Computer Science" />
								</div>
								<div className={styles.fname}>
									<div className={styles.text}>Phone:</div>
									<input id="phoneNumber" className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 1234567890" maxLength={10} />
								</div>
								<div className={styles.button6} onClick={addStudent}>
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
								<div className={styles.text}>Students</div>
							</div>
							<div className={styles.body1}>
								<div className={styles.bodylist}>
									<div
										className="ag-theme-alpine"
										style={{ height: "800px", width: "100%" }}
										>
										<AgGridReact
											rowData={rowData}
											columnDefs={columnDefs}
											pagination={true}
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

export default StaffStudentsView;
