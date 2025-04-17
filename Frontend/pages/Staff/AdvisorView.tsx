import { FunctionComponent, useCallback, useState } from 'react';
import styles from '../../styles/Staff/StaffAdvisorView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';

const StaffAdvisorView:FunctionComponent = () => {
  	
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
		document.cookie = "email=; Max-Age=0; path=/";
		router.push("/");
	}, []);
  	
	// State for student data
	const [rowData, setRowData] = useState([
		{ firstName: "Bob", lastName: "Smith", office: "432", phoneNumber: 43242, advisorId: "A4" },
		{ firstName: "Alice", lastName: "Johnson", major: "323", phoneNumber: 53212, advisorId: "A15" },
	  ]);
	
	// Column definitions for Ag-Grid
	const columnDefs = [
		{ headerName: "First Name", field: "firstName",  },
		{ headerName: "Last Name", field: "lastName",  },
		{ headerName: "Office", field: "office",  },
		{ headerName: "Phone Number", field: "phoneNumber",  },
		{ headerName: "Advisor ID", field: "advisorId",  },
		{ 
			headerName: "Actions",
			field: "actions",
			cellRenderer: CustomButtonComponent,
			flex: 1,
			cellStyle: { textAlign: "center" },
		},
	];

  	return (
    		<div className={styles.staffAdvisorView}>
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
						<div className={styles.button} onClick={onStudentsClick}>
							<div className={styles.text}>Students</div>
						</div>
						<div className={styles.button5} onClick={onAdvisorsClick}>
							<div className={styles.text}>Advisors</div>
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
								<div className={styles.text}>New Advisor</div>
							</div>
							<div className={styles.body}>
								<div className={styles.fname}>
									<div className={styles.text}>First Name:</div>
									<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Bob" maxLength={10} />
								</div>
								<div className={styles.fname}>
									<div className={styles.text}>Last Name:</div>
									<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Smith" maxLength={10} />
								</div>
								<div className={styles.fname}>
									<div className={styles.text}>Office:</div>
									<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 103" maxLength={3} />
								</div>
								<div className={styles.fname}>
									<div className={styles.text}>Phone:</div>
									<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 43523" maxLength={10} />
								</div>
								<div className={styles.button6}>
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
								<div className={styles.text}>Advisors</div>
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

export default StaffAdvisorView;
