import { FunctionComponent, useCallback, useState, useEffect } from 'react';
import styles from '../../styles/Students/StudentDegreeProgressView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS for AG Grid
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS

const StudentDegreeProgressView: FunctionComponent = () => {
  const router = useRouter();

  // Sample data for AG Grid
  const [rowData, setRowData] = useState([
    //{ code: 'CAP 4321', credits: 3, term: 'F24', grade: 'In Progress' },
    //{ code: 'CAP 4322', credits: 4, term: 'F23', grade: 'Completed' },
    //{ code: 'CAP 4323', credits: 2, term: 'S24', grade: 'In Progress' },
    //{ code: 'CAP 4324', credits: 3, term: 'F22', grade: 'Completed' },
  ]);

  // Column definitions for AG Grid
  const [columnDefs] = useState([
    { field: 'code', headerName: 'Course Code', sortable: true, filter: true, flex: 1, },
    { field: 'credits', headerName: 'Credits', sortable: true, filter: true, flex: 1, },
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
    { field: 'grade', headerName: 'Grade', sortable: true, filter: true, flex: 1, },
  ]);

  const [creditHours, setCreditHours] = useState(15);
  const [totalCreditHours, setTotalCreditHours] = useState(126);
  const [gpa, setGpa] = useState(4.0);

  const onScheduleClick = useCallback(() => {
    router.push('/Students/Schedule');
  }, []);

  const onDegreeProgressClick = useCallback(() => {
    router.push('/Students/DegreeProgressView');
  }, []);

  const onSearchClick = useCallback(() => {
    router.push('/Students/SearchCoursesInputView');
  }, []);

  const onRegistrationClick = useCallback(() => {
    router.push('/Students/RegistrationView');
  }, []);

  const onWhatifClick = useCallback(() => {
    router.push('/Students/WhatIfView');
  }, []);

  const onLogoutClick = useCallback(() => {
    document.cookie = 'auth=; Max-Age=0; path=/';
    document.cookie = 'id=; Max-Age=0; path=/';
    router.push('/');
  }, []);

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

		const getProgress = async () => {
			var cookies = document.cookie.split(";");
			const response = await fetch('http://localhost:8080/user/student/progress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "auth": cookies[0].substring(5), "id":cookies[1].substring(4)})
			});
			const result = await response.json();
			var progress = []
      var creditsTaken = 0;
			if (result.status === "success")
			{
				for (var i = 0; i < Object.keys(result).length - 3; i++)
          {
            if (result[i.toString()].grade != "IP")
            {
              creditsTaken += result[i.toString()].credits;
            }
            // Parse the term and year
            const termCode = result[i.toString()].term; // Example: 12024
            const termNumber = Math.floor(termCode / 10000); // Extract the first digit (1, 2, 3)
            const year = termCode % 10000; // Extract the last 4 digits for the year

            // Map the term number to Fall, Spring, or Summer
            const termMapping = { 1: "Spring", 2: "Summer", 3: "Fall", 4: "Winter" };
            const termDisplay = `${termMapping[termNumber]} ${year}`;

					  progress.push({
              code: result[i.toString()].coursePrefix + " " + result[i.toString()].courseNumber.toString(), 
              credits: result[i.toString()].credits, 
              term: termDisplay, 
              grade: result[i.toString()].grade
            });
          }
			}
			setRowData(progress);
      setCreditHours(creditsTaken);
      setTotalCreditHours(result.credithours);
      setGpa(result.gpa);
		}

		checkAuth();
		getProgress();
	}, []);

  return (
    <div className={styles.studentDegreeprogressView}>
      {/* Tab Navigation */}
      <div className={styles.tab}>
        <div className={styles.left}>
          <div className={styles.button} onClick={onScheduleClick}>
            <div className={styles.text}>Schedule</div>
          </div>
          <div className={styles.button1} onClick={onDegreeProgressClick}>
            <div className={styles.text}>Degree Progress</div>
            <div className={styles.buttonChild} />
          </div>
          <div className={styles.button} onClick={onSearchClick}>
            <div className={styles.text}>Search Courses</div>
          </div>
          <div className={styles.button} onClick={onRegistrationClick}>
            <div className={styles.text}>Registration</div>
          </div>
          <div className={styles.button} onClick={onWhatifClick}>
            <div className={styles.text}>What-if Analysis</div>
          </div>
        </div>
        <div className={styles.button} onClick={onLogoutClick}>
          <div className={styles.text}>Logout</div>
        </div>
      </div>

      {/* Body Section */}
      <div className={styles.body}>
        <div className={styles.coursesCard}>
          <div className={styles.header}>
            <div className={styles.text}>{creditHours}/{totalCreditHours} Credit Hours</div>
            <div className={styles.text}>GPA: {gpa.toFixed(2)}</div>
          </div>
          <div className={styles.body1}>
            {/* AG Grid for Degree Progress */}
            <div className="ag-theme-alpine" style={{ height: 700, width: '100%' }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  flex: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDegreeProgressView;
