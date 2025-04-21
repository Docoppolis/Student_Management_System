# Student Management System (SMS)

A full-stack academic scheduling and student management web application designed for university use. This platform supports not only student access, but also roles for Advisors, Instructors, Staff, and Admins to handle a wide variety of academic and administrative operations.

## Built With

- **Frontend:** React.js, Next.js, TypeScript, AG Grid
- **Backend:** Java with Micronaut framework
- **Database:** PostgreSQL
- **Authentication:** Custom token-based authentication

---

## Features

### Login System
- Secure login using email and password
- Session management with token-based cookies
- Role-based redirection to dashboards

### Student Dashboard
- View class schedule
- Search and register/drop for courses
- What-if analysis for hypothetical GPA scenarios
- Degree progress tracking

### Instructor Dashboard
- View and manage assigned courses
- Access to student rosters and grades

### Advisor Dashboard
- Register/drop classes for assigned students
- View student academic progress
- Access departmental reports

### Staff Dashboard
- Generate system-wide reports including enrollment, department GPA averages, and student registration summaries
- Access and filter data logs related to courses, majors, and registration statistics

### Admin (Site Admin) Dashboard — *Work in Progress*
- Planned functionality for viewing comprehensive logs and monitoring system activity
- Intended for high-level maintenance, access control, and auditing
- Development ongoing

---

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Java (JDK 17+)
- Micronaut framework
- PostgreSQL
- Docker (optional)
- Bash terminal or WSL for Windows users

---

### Running the App

#### 1. Backend (Micronaut Java)
Navigate to the backend directory and run:

```bash
cd Backend/studentmanagementsystem
./gradlew run
```

#### 2. Frontend (React + Next.js)
In a new terminal tab/window:

```bash
cd Frontend
npm install
npm run dev
```

---

## Sample Credentials (Test Users)

| Role       | Username               | Password   |
|------------|------------------------|------------|
| Student    | `student@example.com`  | `password` |
| Advisor    | `advisor@example.com`  | `password` |
| Instructor | `instructor@example.com` | `password` |
| Staff      | `staff@example.com`    | `password` |
| Admin      | `admin@example.com`    | `password` |


---

## Project Structure

```
├── Backend/studentmanagementsystem
│   └── src/main/java/studentmanagementsystem
│       ├── Authentication/
│       ├── DAOs/
│       ├── DTOs/
│       ├── Entities/
│       ├── controllers/
│       ├── exceptions/
│       ├── interfaces/
│       ├── services/
│       ├── Application.java
│       ├── Database.java
│       └── UserType.java
│
├── Frontend/
│   ├── .next
│   ├── components/
│   ├── pages/
│   ├── public/
|   ├── styles/
|   ├── tempfolder/
│   └── util/
│
└── README.md
```

---

## Credits

### Developer: **John Parrott**

#### Personal Contributions:
- Designed and implemented backend API using Java and Micronaut
- Created REST endpoints for registration, course search, GPA tracking, and schedule management
- Wrote SQL queries and integrated PostgreSQL database operations
- Developed backend logic for the student dashboard, including schedule retrieval, and course search
- Built backend support for the advisor dashboard, including registration, student-specific views, and course filtering
- Implemented backend functionality for the instructor dashboard, enabling section management and schedule retrieval
- Handled backend operations for the staff dashboard, powering reports and internal statistics
- Collaborated with frontend team to ensure seamless user navigation and state management

---

## Notes

- Admin (Site Admin) functionality for system logs and full-site auditing is currently a **work in progress**.
- This project is intended as a class portfolio piece and is not currently hosted or deployed publicly.


