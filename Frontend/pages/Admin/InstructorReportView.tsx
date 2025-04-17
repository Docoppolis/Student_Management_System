import { FunctionComponent, useCallback, useState } from 'react';
import styles from '../../styles/Students/StudentSearchCoursesInputView.module.css';
import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AdminInstructorReportView: FunctionComponent = () => {
    const router = useRouter();

    const onDataLogClick = useCallback(() => {
        router.push("/Admin/DataLogView");
    }, []);

    const onStudentReportClick = useCallback(() => {
        router.push("/Admin/StudentReportView");
    }, []);

    const onDepartmentReportClick = useCallback(() => {
        router.push("/Admin/DepartmentReportView");
    }, []);

    const onEnrollmentReportClick = useCallback(() => {
        router.push("/Admin/EnrollmentReportView");
    }, []);

    const onInstructorReportClick = useCallback(() => {
        router.push("/Admin/InstructorReportView");
    }, []);

    const onMajorReportClick = useCallback(() => {
        router.push("/Admin/MajorReportView");
    }, []);


    const onLogoutClick = useCallback(() => {
        document.cookie = "auth=; Max-Age=0; path=/";
        document.cookie = "email=; Max-Age=0; path=/";
        router.push("/");
    }, []);

    const columnDefs = [
		{
			headerName: "Name",
			field: "name",
			filter: "agTextColumnFilter", // Text filter for course code
		},
		{
			headerName: "Course",
			field: "course",
		},
		{
			headerName: "Major",
			field: "major",
		},
        {
			headerName: "Total Students",
			field: "totalStudents",
		},
	];
	

    const [rowData, setRowData] = useState([
        {
            name: "Dr. Smith",
            course: "ABC 1111",
            major: "400",
            totalStudents: "80",
        },
        {
            name: "Dr. Bob",
            course: "CYP 1234",
            major: "400",
            totalStudents: "120",
        },
        {
            name: "Dr. Goat",
            course: "RET 9421",
            major: "400",
            totalStudents: "40",
        },
    ]);

    return (
        <div className={styles.studentSearchcoursesInputView}>
            <div className={styles.tab}>
                <div className={styles.left}>
                    <div className={styles.button} onClick={onDataLogClick}>
                        <div className={styles.text}>Data-Log</div>
                    </div>
                    <div className={styles.button} onClick={onStudentReportClick}>
                        <div className={styles.text}>Student Report</div>
                    </div>
                    <div className={styles.button} onClick={onDepartmentReportClick}>
                        <div className={styles.text}>Department Report</div>
                    </div>
                    <div className={styles.button} onClick={onEnrollmentReportClick}>
                        <div className={styles.text}>Enrollment Report</div>
                    </div>
                    <div className={styles.button2} onClick={onInstructorReportClick}>
                        <div className={styles.text}>Instructor Report</div>
                        <div className={styles.buttonChild} />
                    </div>
                    <div className={styles.button} onClick={onMajorReportClick}>
                        <div className={styles.text}>Major Report</div>
                    </div>
                </div>
                <div className={styles.button} onClick={onLogoutClick}>
                    <div className={styles.text}>Logout</div>
                </div>
            </div>
            <div className={styles.pageBody}>
                <div className={styles.rightSide}>
					<div className={styles.coursesCard}>
						<div className={styles.header}>
							<div className={styles.text}>Instructor Reports</div>
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

export default AdminInstructorReportView;
