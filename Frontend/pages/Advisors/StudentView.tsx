import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Advisors/AdvisorStudentView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AdvisorStudentView:FunctionComponent = () => {
  	
    const router = useRouter();  	

    const [studentName, setStudentName] = useState ("Greg Heffley");

    const [major, setMajor] = useState ("CSE");

    const [gender, setGender] = useState ("Male");

    const [creditsHours, setCreditsHours] = useState (15);

    const [maxCreditsHours, setMaxCreditsHours] = useState (120);

    const [gpa, setGPA] = useState (4.0);

    const [rowData, setRowData] = useState([
        {
            course: 'COP 4362',
            credits: 3,
            term: 'F24',
            grade: 'IP',
        },
        {
            course: 'CEN 4020',
            credits: 4,
            term: 'F23',
            grade: 'A',
        },
        {
            course: 'CIS 4250',
            credits: 3,
            term: 'S23',
            grade: 'B+',
        },
        {
            course: 'EEL 3701',
            credits: 4,
            term: 'S22',
            grade: 'A-',
        },
        {
            course: 'CAP 4621',
            credits: 3,
            term: 'F21',
            grade: 'B',
        },
        {
            course: 'ENC 3246',
            credits: 3,
            term: 'S21',
            grade: 'A',
        },
        {
            course: 'COP 4710',
            credits: 3,
            term: 'F20',
            grade: 'C+',
        },
        {
            course: 'PHY 2048',
            credits: 4,
            term: 'F19',
            grade: 'B+',
        },
    ]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Course', field: 'course', sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'center' } },
        { headerName: 'Credits', field: 'credits', sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'center' } },
        {
            headerName: 'Term',
            field: 'term',
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { textAlign: 'center' },
            comparator: (a, b) => {
                const semesterOrder = { 'S': 0, 'U': 1, 'F': 2 }; // Spring -> 0, Summer -> 1, Fall -> 2
                const [aSemester, aYear] = [a.charAt(0), parseInt(a.slice(1))];
                const [bSemester, bYear] = [b.charAt(0), parseInt(b.slice(1))];
    
                // Compare by year first
                if (aYear !== bYear) {
                    return aYear - bYear;
                }
                // If years are equal, compare by semester order
                return semesterOrder[aSemester] - semesterOrder[bSemester];
            },
        },
        { headerName: 'Grade', field: 'grade', sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'center' } },
    ]);


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

    const [studentID, setStudentID] = useState(''); // Track the input value
    const [isVisible, setIsVisible] = useState(false); // Control visibility of cards

    // Handle check icon click
    const handleCheckClick = useCallback(async () => {

        var cookies = document.cookie.split(";");
        const response = await fetch('http://localhost:8080/user/advisor/student/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4), "uid":document.getElementById("uid").value})
        });
        const result = await response.json();
        if (result.status === "success")
        {
            setGPA(result.gpa);
            setCreditsHours(result.credits);
            setMaxCreditsHours(result.maxcredits);
            setMajor(result.major);
            setStudentName(result.name);
            setGender(result.gender);
            var entries = [];
            for (var i = 0; i < Object.keys(result).length - 7; i++)
                entries.push({course: result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber, credits: result[i.toString()].credits, term: result[i.toString()].term + result[i.toString()].year.toString().substring(2), grade: result[i.toString()].grade});
            setRowData(entries);
        }

        if (studentID.trim()) {
            setIsVisible(true); // Show cards if input is not empty
        } else {
            setIsVisible(false); // Hide cards if input is empty
        }
    }, [studentID]);

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



    return (
        <div className={styles.page}>
            <div className={styles.tab}>
                <div className={styles.buttonParent}>
                    <div className={styles.button} onClick={onSearchCoursesClick}>
                        <div className={styles.text}>Search Courses</div>
                    </div>
                    <div className={styles.button} onClick={onRegistrationClick}>
                        <div className={styles.text}>Registration</div>
                    </div>
                    <div className={styles.button1} onClick={onStudentClick}>
                        <div className={styles.text}>Students</div>
                        <div className={styles.buttonChild} />
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
                <div className={styles.leftSide}>
                    <div className={styles.filtersCard}>
                        <div className={styles.header}>
                            <div className={styles.text}>Enter Student ID</div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.columns}>
                                <div className={styles.textBox}>
                                    <input 
                                        type="text" 
                                        id="uid" 
                                        value={studentID}
                                        onChange={(e) => setStudentID(e.target.value)} // Update state on input change
                                        className={styles.textBoxInput} 
                                        maxLength={9} 
                                        placeholder="Enter ID" 
                                    />
                                </div>
                                <img 
                                    className={`f${styles.checkIcon} ${styles.pushDown}`} 
                                    alt="" 
                                    src="/Check.svg" 
                                    onClick={handleCheckClick} // Handle click on the check icon
                                />
                            </div>
                        </div>
                    </div>

                    {isVisible && ( // Conditionally render the Student Info Card
                        <div className={styles.filtersCard}>
                            <div className={styles.header}>
                                <div className={styles.text}>Student Info</div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.row}>
                                    <div className={styles.textItem}>Name: {studentName}</div>
                                    <div className={styles.textItem}>Major: {major}</div>
                                    <div className={styles.textItem}>Gender: {gender}</div>
                                    <div className={styles.textItem}>Credit Hours: {creditsHours}/{maxCreditsHours}</div>
                                    <div className={styles.textItem}>GPA: {gpa}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.divider}>
                    <div className={styles.dividerChild} />
                </div>

                {isVisible && ( // Conditionally render the Degree Progress Card
                    <div className={styles.rightSide}>
                        <div className={styles.coursesCard}>
                            <div className={styles.header}>
                                <div className={styles.text}>
                                    Degree Progress for {studentName} {/* Dynamically show studentName */}
                                </div>
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
                                            }}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>);
};

export default AdvisorStudentView;
