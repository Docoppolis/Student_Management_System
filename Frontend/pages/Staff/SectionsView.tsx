import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Staff/StaffSectionsView.module.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomButtonComponent from '../../components/buttons/CustomButtonComponent';
import { getClassTimeBlock } from "../../util/timeBlockUtil";

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
		document.cookie = "id=; Max-Age=0; path=/";
		router.push("/");
	}, []);

	// Course Data
	const [rowData, setRowData] = useState([
	{
		courseCode: "EDU 1004",
		title: "Intro to Taking Classes",
		credits: 3,
		departments: "CSE, CS, PHY",
	},
	{
		courseCode: "MAC 2312",
		title: "Calculus 3",
		credits: 3,
		departments: "CSE, CS, PHY",
	},
	{
		courseCode: "CEN 4020",
		title: "Software Engineering",
		credits: 3,
		departments: "CSE, CS, PHY",
	}
	]);
	const columnDefs: ColDef[] = [
	{ headerName:'Course', field: 'courseCode', },
	{ headerName: 'CRN', field: 'crn', },
	{ headerName: 'Schedule', field: 'schedule', flex: 2, },
	{ headerName: 'Title', field: 'title', flex: 2,},
	{ headerName: 'Credits', field: 'credits', },
	{ headerName: 'Seats', field: 'seats', },
	{ 
		field: 'term', 
		headerName: 'Term', 
		sortable: true, 
		filter: true, 
		flex: 1, 
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
	{ field: 'actions', cellRenderer: CustomButtonComponent, },
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

		const getSections = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/staff/sections', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			var section_list = []
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 1; i++)
                {
					const season = result[i.toString()].season; // Should be 1, 2, 3, or 4
					const year = result[i.toString()].year;    // Example: 2024

					// Improved Term Mapping and Validation
					const termMapping = { 1: "Spring", 2: "Summer", 3: "Fall", 4: "Winter" };

					// Ensure 'season' is a valid key in 'termMapping'
					const termDisplay = termMapping[season] ? `${termMapping[season]} ${year}` : `Unknown Term ${year}`;

					section_list.push({
						courseCode: result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber,
						crn: result[i.toString()].crn,
						schedule: getClassTimeBlock(result[i.toString()].timeBlock),
						title: result[i.toString()].courseTitle,
						credits: result[i.toString()].credits,
						seats: result[i.toString()].seats,
						term: termDisplay,
					});
                }
			}
			setRowData(section_list);
		}

		const addSection = async () => {
		var cookies = document.cookie.split(";");
		const response = await fetch('http://localhost:8080/user/staff/sections', {
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
		getSections();
	}, []);

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
							<div className={styles.text}>Prefix:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., EDU" maxLength={3} id="coursePrefix" />
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Number:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 1004" maxLength={4} id="courseNumber" />
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Time and Day:</div>
							<select className={styles.dropdown} id="timeBlock">
								<option value="0">8:00am - 9:15am MW</option>
								<option value="1">9:30am - 10:45am MW</option>
								<option value="2">11:00am - 12:15pm MW</option>
								<option value="3">12:30pm - 1:45pm MW</option>
								<option value="4">2:00pm - 3:15pm MW</option>
								<option value="5">3:30pm - 4:45pm MW</option>
								<option value="6">8:00am - 9:15am TR</option>
								<option value="7">9:30am - 10:45am TR</option>
								<option value="8">11:00am - 12:15pm TR</option>
								<option value="9">12:30pm - 1:45pm TR</option>
								<option value="10">2:00pm - 3:15pm TR</option>
								<option value="11">3:30pm - 4:45pm TR</option>
								<option value="12">8:00am - 9:15am F</option>
								<option value="13">9:30am - 10:45am F</option>
								<option value="14">11:00am - 12:15pm F</option>
								<option value="15">12:30pm - 1:45pm F</option>
								<option value="16">2:00pm - 3:15pm F</option>
								<option value="17">3:30pm - 4:45pm F</option>
							</select>
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Building:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Building" maxLength={3} id="building" />
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Room:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., Room" maxLength={4} id="room"/>
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Seats:</div>
							<input className={styles.typeCoursePrefixWrapper} type="text" placeholder="e.g., 30" maxLength={3} id="seats"/>
						</div>
						<div className={styles.coursePrefix}>
							<div className={styles.text}>Term:</div>
							<select className={styles.dropdown} id="year">
								<option value="2024,4">Winter 2024</option>
								<option value="2025,1">Spring 2025</option>
								<option value="2025,2">Summer 2025</option>
								<option value="2025,3">Fall 2025</option>
								<option value="2025,4">Winter 2025</option>
								<option value="2026,1">Spring 2026</option>
								<option value="2026,2">Summer 2026</option>
								<option value="2026,3">Fall 2026</option>
								<option value="2026,4">Winter 2026</option>
							</select>
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
								style={{ height: "800px", width: "100%" }}
								>
								<AgGridReact
									rowData={rowData} // Data for the grid
									columnDefs={columnDefs} // Column definitions
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
	</div>
	);
};

export default StaffSectionsView;
