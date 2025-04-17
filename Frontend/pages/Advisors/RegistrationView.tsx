import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import styles from '../../styles/Advisors/AdvisorRegistrationView.module.css';
import { useRouter } from 'next/router';
import RegistrationComponent from '@/components/Advisors/RegistrationComponent';

const AdvisorRegistrationView:FunctionComponent = () => {
  	
    const router = useRouter();  	

	const [rowData, setRowData] = useState([
        {
            course: 'COP 4362',
            title: 'Programming Concepts',
            credits: 3,
            registrationDate: '5-10-2024',
            crn: '51010',
        },
    ]);

    // Initialize column definitions using useState
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Course', field: 'course',  },
        { headerName: 'Title', field: 'title', flex: 2,  },
        { headerName: 'Credits', field: 'credits',  },
		{ headerName: 'Term', field: 'term', },
        { headerName: 'Registration Date', field: 'registrationDate', flex: 2, },
        { headerName: 'CRN', field: 'crn', },
    ]);
	
	// Default column definition
    const [defaultColDef] = useState({
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        cellStyle: { textAlign: 'center' }, // Centers all content by default
    });

	const [studentName, setStudentName] = useState(""); // State for student's name
	const [studentID, setStudentID] = useState(""); // State for Student ID
	const [showTable, setShowTable] = useState(false); // State to toggle table visibility

	const getCurrentRegistration = async () => {
		var cookies = document.cookie.split(";");
		const response = await fetch('http://localhost:8080/user/advisor/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "uid": studentID })
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
					registrationDate: result[i.toString()].regDate, 
					crn: result[i.toString()].crn
				});
			}
		}
		setRowData(registration);
		console.log("Updated rowData:", registration); // Log updated data
	}

	const handleStudentIDChange = () => {
		if (studentID.trim() !== "") {

			setShowTable(true);
			getCurrentRegistration();
  
		  } else {
			setShowTable(false);
		  }
	};

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
  	
	var add_drops = {
		"auth":"",
		"id":"",
		"uid":"",
		"crn0":0,
		"crn1":0,
		"crn2":0,
		"crn3":0,
		"crn4":0,
		"crn5":0
	};

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

		checkAuth();
	}, []);

	const onRegister = async () => {
		var cookies = document.cookie.split(";");
		add_drops.auth = cookies[0].substring(5);
		add_drops.id = cookies[1].substring(4);
		add_drops.uid = document.getElementById("uid").value;
		add_drops.crn0 = Number(document.getElementById("crn0").value);
		add_drops.crn1 = Number(document.getElementById("crn1").value);
		add_drops.crn2 = Number(document.getElementById("crn2").value);
		add_drops.crn3 = Number(document.getElementById("crn3").value);
		add_drops.crn4 = Number(document.getElementById("crn4").value);
		add_drops.crn5 = Number(document.getElementById("crn5").value);
		const response = await fetch('http://localhost:8080/user/advisor/registration/add', {
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
				await getCurrentRegistration();
				//router.reload();
			}
	};

	const onDrop = async () => {
		var cookies = document.cookie.split(";");
		add_drops.auth = cookies[0].substring(5);
		add_drops.id = cookies[1].substring(4);
		add_drops.uid = document.getElementById("uid").value;
		add_drops.crn0 = Number(document.getElementById("crn0").value);
		add_drops.crn1 = Number(document.getElementById("crn1").value);
		add_drops.crn2 = Number(document.getElementById("crn2").value);
		add_drops.crn3 = Number(document.getElementById("crn3").value);
		add_drops.crn4 = Number(document.getElementById("crn4").value);
		add_drops.crn5 = Number(document.getElementById("crn5").value);
		const response = await fetch('http://localhost:8080/user/advisor/registration/drop', {
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
				await getCurrentRegistration();
			}
	};

  	return (
    		<div className={styles.advisorRegistrationView}>
      			<div className={styles.tab}>
        				<div className={styles.buttonParent}>
          					<div className={styles.button} onClick={onSearchCoursesClick}>
            						<div className={styles.text}>Search Courses</div>
          					</div>
          					<div className={styles.button1} onClick={onRegistrationClick}>
            						<div className={styles.text}>Registration</div>
            						<div className={styles.buttonChild} />
          					</div>
          					<div className={styles.button} onClick={onStudentClick}>
            						<div className={styles.text}>Students</div>
          					</div>
          					<div className={styles.button} onClick={onWhatIfClick}>
            						<div className={styles.text}>What-If Analysis</div>
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
									<div className={styles.enterStudentId}>Enter Student ID</div>
								</div>
								<div className={styles.body}>
									<div className={styles.columns}>
										<div className={styles.textBox}>
											<input 
												type="text" 
												id="uid" 
												className={styles.textBoxInput} 
												maxLength={9} 
												value={studentID}
												placeholder="Enter ID"
												onChange={(e) => setStudentID(e.target.value)}
											/>
										</div>
										<img 
											className={`f${styles.checkIcon} ${styles.pushDown}`} 
											alt="" 
											src="/Check.svg"
											onClick={handleStudentIDChange} // Trigger table visibility
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
										<img className={`${styles.plusIcon} ${styles.pushDown}`} alt="Plus Icon" src="/Plus.svg" onClick={onRegister}/>
										<img className={`${styles.minusIcon} ${styles.pushDown}`} alt="Minus Icon" src="/Minus.svg" onClick={onDrop}/>
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
								{studentName ? `Course Registration Details for ${studentName}` : "Course Registration Details"}
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
    		</div>
		);
};

export default AdvisorRegistrationView;
