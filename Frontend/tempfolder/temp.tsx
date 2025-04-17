import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Staff/StaffSectionsView.module.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';

const StaffSectionsView: React.FC = () => {
	const router = useRouter();

	// Navigation Handlers
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

	// Course Data
	const [rowData, setRowData] = useState([
	{
		course: "EDU 1004",
		title: "Intro to Taking Classes",
		credits: 3,
		departments: "CSE, CS, PHY",
	},
	{
		course: "MAC 2312",
		title: "Calculus 3",
		credits: 3,
		departments: "CSE, CS, PHY",
	},
	{
		course: "CEN 4020",
		title: "Software Engineering",
		credits: 3,
		departments: "CSE, CS, PHY",
	}
	]);
	const suppressDragLeaveHidesColumns = true;
	const columnDefs: ColDef[] = [
	{ field: 'course', },
	{ field: 'title', },
	{ field: 'credits', },
	{ field: 'departments', },
	{ field: 'actions', cellRenderer: CustomButtonComponent, },
	];	  

	return (
	<div className={styles.staffCoursesView}>
		<div className={styles.tab}>
			<div className={styles.left}>
				<div className={styles.button} onClick={onDepartmentClick}>
					<div className={styles.text}>Department</div>
				</div>
				<div className={styles.button} onClick={onCoursesClick}>
					<div className={styles.text}>Courses</div>
				</div>
				<div className={styles.button1} onClick={onSectionsClick}>
					<div className={styles.text}>Sections</div>
					<div className={styles.buttonChild} />
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
						<div className={styles.text}>New Section</div>
					</div>
					<div className={styles.body}>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Course:</div>
							<select className={styles.dropdown}>
								<option value="CRN1">EDU 1004</option>
								<option value="CRN2">MAC 2312</option>
								<option value="CRN3">CEN 4020</option>
							</select>
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Time and Day:</div>
							<select className={styles.dropdown}>
								<option value="monday-8am">Monday, 08:00 AM</option>
								<option value="tuesday-2pm">Tuesday, 02:00 PM</option>
								<option value="wednesday-6pm">Wednesday, 06:00 PM</option>
								<option value="thursday-9am">Thursday, 09:00 AM</option>
								<option value="friday-5pm">Friday, 05:00 PM</option>
								<option value="saturday-11am">Saturday, 11:00 AM</option>
								<option value="sunday-3pm">Sunday, 03:00 PM</option>
							</select>
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Building:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Building" maxLength={3} />
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Room:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Room" maxLength={4} />
						</div>
						<div className={styles.button6}>
							<div className={styles.text}>Create</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.divider}>
				<div className={styles.dividerChild}></div>
			</div>
			<div className={styles.rightSide}>
				<div className={styles.coursesCard}>
					<div className={styles.header}>
						<div className={styles.text}>Sections</div>
					</div>
					<div className={styles.body1}>
						<div className={styles.bodylist}>
							<div
								className="ag-theme-alpine"
								style={{ height: "500px", width: "100%" }}
								>
								<AgGridReact
									rowData={rowData} // Data for the grid
									columnDefs={columnDefs} // Column definitions
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
	</div>
	);
};

export default StaffSectionsView;
