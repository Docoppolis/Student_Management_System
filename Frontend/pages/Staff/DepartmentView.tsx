import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Staff/StaffCoursesView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';

const StaffDepartmentView:FunctionComponent = () => {
  	
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
	const [rowData, setRowData] = useState([
		{ major: "Computer Science", credits: 120, building: "ENG", room: 1034 },
		{ major: "Computer Engineering", credits: 130, building: "ENG", room: 1034 },
		{ major: "Seanology", credits: 115, building: "ENG", room: 1034 },
	  ]);
	
	// Column definitions for Ag-Grid
	const columnDefs = [
		{ headerName: "Major", field: "major", },
		{ headerName: "Credits", field: "credits",  },
		{ 
			headerName: "Actions",
			field: "actions",
			cellRenderer: CustomButtonComponent,
			flex: 1,
			cellStyle: { textAlign: "center" },
		},
	];

	const [building, setBuilding] = useState("ENG");
	const [room, setRoom] = useState(1004);

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
	   	}

		const getMajors = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/staff/major', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			const majors = [];
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 3; i++)
					majors.push({
						major: result[i.toString()].title,
                        credits: result[i.toString()].credits
					});

			}
			setRowData(majors);
			setBuilding(result.building);
			setRoom(result.room);
		}

		checkAuth();
		getMajors();
	}, []);

    const addMajor = async () => {
        var cookies = document.cookie.split(";");
        const response = await fetch('http://localhost:8080/user/staff/major/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "title":document.getElementById("title").value, "credits":Number(document.getElementById("credits").value)})
        });
        const result = await response.json();
		alert(result.message);
		router.reload();
    }

  	return (
    		<div className={styles.staffCoursesView}>
      			<div className={styles.tab}>
					<div className={styles.left}>
						<div className={styles.button1} onClick={onDepartmentClick}>
							<div className={styles.text}>Department</div>
							<div className={styles.buttonChild} />
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
              							<div className={styles.text}>New Major</div>
            						</div>
            						<div className={styles.body}>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Title:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="title" type="text" placeholder="e.g., Computer Science" />
              							</div>
              							<div className={styles.coursePrefix}>
                								<div className={styles.text}>Credits:</div>
                								<input className={styles.typeCoursePrefixWrapper} id="credits" type="text" placeholder="e.g., 120" maxLength={3} />
              							</div>
              							<div className={styles.button6} onClick={addMajor}>
                								<div className={styles.text}>Create</div>
              							</div>
            						</div>
          					</div>
							
							<div className={styles.filtersCard}>
								<div className={styles.header}>
									<div className={styles.text}>Department Info</div>
								</div>
								<div className={styles.body}>
									<div className={styles.coursePrefix}>
										<div className={styles.text}>Building:</div>
										<div className={styles.typeCoursePrefixWrapper}>{building}</div>
									</div>
									<div className={styles.coursePrefix}>
										<div className={styles.text}>Room:</div>
										<div className={styles.typeCoursePrefixWrapper}>{room}</div>
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
              							<div className={styles.text}>Majors</div>
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

export default StaffDepartmentView;
