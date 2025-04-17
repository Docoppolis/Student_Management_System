import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Staff/StaffSearchInstructors.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { get } from 'http';

const StaffSearchInstructors:FunctionComponent = () => {
  	
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

	var add_drops = {
		"auth":"",
		"id":"",
		"iid":"",
		"crn0":0,
		"crn1":0,
		"crn2":0,
		"crn3":0,
		"crn4":0,
		"crn5":0
	};

	const [instructorName, setInstructorName] = useState(""); // State for instructor's name
	const [instructorID, setInstructorID] = useState(""); // State for Instructor ID
	const [showTable, setShowTable] = useState(false); // State to toggle table visibility

	const getCurrentRegistration = async () => {
		console.log("Instructor ID:", instructorID); // Log instructor ID
		var cookies = document.cookie.split(";");
		const response = await fetch('http://localhost:8080/user/staff/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "iid": instructorID })
		});
		const result = await response.json();
		console.log("Registration response:", result); // Log response
		var registration = []
		if (result.status === "success")
		{
			for (var i = 0; i < Object.keys(result).length - 1; i++)
			{
				// Extract term number and year from string
				const termCode = result[i.toString()].term; // Example: "2 2024"
				const [termNumberString, yearString] = termCode.split(" ");
				const termNumber = parseInt(termNumberString, 10); // Extracts 2
				const year = parseInt(yearString, 10); // Extracts 2024

				// Map the term number to Fall, Spring, or Summer
				const termMapping = { 1: "Spring", 2: "Summer", 3: "Fall", 4: "Winter" };
				const termDisplay = `${termMapping[termNumber]} ${year}`;
				registration.push({
					course: result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber.toString(), 
					title: result[i.toString()].courseTitle, 
					credits: result[i.toString()].credits,
					term: termDisplay,
					//registrationDate: result[i.toString()].regDate, 
					crn: result[i.toString()].crn
				});
			}
		}
		setRowData(registration);
		console.log("Updated rowData:", registration); // Log updated data
	}

	const onRegister = async () => {
		var cookies = document.cookie.split(";");
		add_drops.auth = cookies[0].substring(5);
		add_drops.id = cookies[1].substring(4);
		add_drops.iid = document.getElementById("iid").value;
		add_drops.crn0 = Number(document.getElementById("crn0").value);
		add_drops.crn1 = Number(document.getElementById("crn1").value);
		add_drops.crn2 = Number(document.getElementById("crn2").value);
		add_drops.crn3 = Number(document.getElementById("crn3").value);
		add_drops.crn4 = Number(document.getElementById("crn4").value);
		add_drops.crn5 = Number(document.getElementById("crn5").value);
		const response = await fetch('http://localhost:8080/user/staff/registration/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(add_drops)
		});
		const result = await response.json();
		if (result.status === "success")
		{
			var alerts = "";
			for (var i = 0; i < Object.keys(result).length - 1; i++)
				alerts+=(result[i.toString()].crn + ": " + result[i.toString()].message  + "\n");
			alert(alerts);
			getCurrentRegistration();
		}
	};

	const onDrop = async () => {
		var cookies = document.cookie.split(";");
		add_drops.auth = cookies[0].substring(5);
		add_drops.id = cookies[1].substring(4);
		add_drops.iid = document.getElementById("iid").value;
		add_drops.crn0 = Number(document.getElementById("crn0").value);
		add_drops.crn1 = Number(document.getElementById("crn1").value);
		add_drops.crn2 = Number(document.getElementById("crn2").value);
		add_drops.crn3 = Number(document.getElementById("crn3").value);
		add_drops.crn4 = Number(document.getElementById("crn4").value);
		add_drops.crn5 = Number(document.getElementById("crn5").value);
		const response = await fetch('http://localhost:8080/user/staff/registration/drop', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(add_drops)
		});
		const result = await response.json();
		if (result.status === "success")
		{
			var alerts = "";
			for (var i = 0; i < Object.keys(result).length - 1; i++)
				alerts+=(result[i.toString()].crn + ": " + result[i.toString()].message  + "\n");
			alert(alerts);
			getCurrentRegistration();
		}
	};

	const handleInstructorIDChange = () => {
		// Show table when valid ID is entered (e.g., non-empty)
		if (instructorID.trim() !== "") {
		  setShowTable(true);
		  getCurrentRegistration();
		} else {
		  setShowTable(false);
		}
	};

	const [rowData, setRowData] = useState([]);
	  
	const columnDefs = [
		{ headerName: "Course", field: "course", },
		{ headerName: "Title", field: "title", },
		{ headerName: "Credits", field: "credits", },
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
		//{ headerName: "Registration Date", field: "registrationDate", },
		{ headerName: "CRN", field: "crn"}
	];

  	return (
    		<div className={styles.staffSearchInstructors}>
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
						<div className={styles.button3} onClick={onRegistrationClick}>
								<div className={styles.text}>Register Instructors</div>
								<div className={styles.buttonChild} />
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
					<div className={styles.topSection}>
						<div className={styles.columns}>
							<div className={styles.card}>
								<div className={styles.header}>
									<div className={styles.text}>Enter Instructor ID</div>
								</div>
								<div className={styles.body}>
									<div className={styles.columns}>
										<div className={styles.textBox}>
										<input
											className={styles.textBoxInput}
											type="text"
											placeholder="Enter ID"
											id = "iid"
											maxLength={10}
											value={instructorID}
											onChange={(e) => setInstructorID(e.target.value)} // Track changes
										/>
										</div>
										<img
											className={`${styles.checkIcon} ${styles.pushDown}`}
											alt="Check Icon"
											src="/Check.svg"
											onClick={() => {
												handleInstructorIDChange();
												getCurrentRegistration();
											}}
										/>
									</div>
								</div>
							</div>
								<div className={styles.adddropCard}>
									<div className={styles.header1}>
										<img className={styles.checkIcon} alt="" src="/Info.svg" />
										<div className={styles.text}>Input up to 6 CRNs to add or drop</div>
									</div>
									<div className={styles.body1}>
										<div className={styles.row}>
											<input className={styles.textBox2} id="crn0" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn1" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn2" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn3" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn4" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn5" type="text" placeholder="Enter CRN" maxLength={5}/>
											<input className={styles.textBox2} id="crn6" type="text" placeholder="Enter CRN" maxLength={5}/>
											<img className={`${styles.plusIcon} ${styles.pushDown}`} alt="" src="/Plus.svg" onClick={onRegister}/>
											<img className={`${styles.plusIcon} ${styles.pushDown}`} alt="" src="/Minus.svg" onClick={onDrop} />
										</div>
									</div>
								</div>
          					</div>
						<div className={styles.divider} />
        				</div>
        				<div className={styles.bottomSection}>		
							{/* Conditionally render Box around AG Grid */}
							{showTable && (
								<>
								{/* Header for AG Grid */}
								<div
									style={{
										boxShadow: "4px 4px 0px #000",
										backgroundColor: "#EA526F",
										border: "2px solid #000",
										padding: "10px",
										boxSizing: "border-box",
										width: "100%",
										textAlign: "center", // Center-align text
										color: "#000", // White text color for contrast
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									{instructorName ? `Course Registration Details for ${instructorName}` : "Course Registration Details"}
								</div>
								{/* Box around AG Grid */}
								<div
									style={{
									boxShadow: "4px 4px 0px #000",
									backgroundColor: "#f7f7ff",
									border: "2px solid #000",
									padding: "10px",
									boxSizing: "border-box",
									width: "100%",
									}}
								>
									<div className="ag-theme-alpine" style={{ height: "700px", width: "100%" }}>
									<AgGridReact
										rowData={rowData}
										columnDefs={columnDefs} // Column definitions from state
										pagination={true}
										paginationPageSize={10}
										defaultColDef={{
										sortable: true,
										filter: true,
										editable: true,
										flex: 1,
										}}
									/>
									</div>
								</div>
								</>
							)}
        				</div>	
      			</div>
    		</div>);
};

export default StaffSearchInstructors;
