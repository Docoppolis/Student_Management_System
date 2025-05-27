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

## Student Account Visuals
Login
![image](https://github.com/user-attachments/assets/d12397d7-9adc-45de-90eb-53f3f1accc57)

Schedule
![image](https://github.com/user-attachments/assets/d16f6959-5714-45ce-985d-2f06dda413b2)

Degree Progress
![image](https://github.com/user-attachments/assets/21fba63f-0c0d-4511-8880-96b3b8c9ff6d)

Course Search
![image](https://github.com/user-attachments/assets/d2dea8da-e8a2-45d8-b824-7d6015f6c8b3)

Add/Drop
![image](https://github.com/user-attachments/assets/bd7d3022-8d34-4fd4-acca-29f80e6c483c)

GPA Analysis
![image](https://github.com/user-attachments/assets/ac5f90cf-7e13-4b23-8626-1dd81c954877)


---

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Java (JDK 17+)
- Micronaut framework
- PostgreSQL

---

### Running the App

#### 1. Backend (Micronaut Java)

Navigate to the Backend/studentmanagementsystem directory:
```bash
cd Backend/studentmanagementsystem
```
First-time setup (recommended):
```bash
./gradlew clean build
```
This will clear any cached or broken build artifacts and ensure dependencies are installed properly.

To run the backend app:

```bash
./gradlew run
```
This uses the Gradle wrapper to build and run the Micronaut application using the main class defined in build.gradle.

#### 2. Frontend (React + Next.js)
In a new terminal tab/window, navigate to the Frontend directory:
```bash
cd Frontend
```

First-time setup:
```bash
rm -rf node_modules package-lock.json  # optional but helpful if you're seeing issues
npm install
```

To start the frontend development server:
```bash
npm run dev
```
This will start the Next.js development server, typically at http://localhost:3000.

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

### Developer: **Sean Finch**

#### Personal Contributions:
- Designed and implemented backend API using Java and Micronaut
- Created various REST endpoints
- Developed backend and frontend logic for the grade calculation, what-if, and register/drop
- Built backend support for student logic
- Implemented backend functionality for instructor operations
- Set up frontend code and logic for API requests

---

## Notes

- Admin (Site Admin) functionality for system logs and full-site auditing is currently a **work in progress**.
- This project is intended as a class portfolio piece and is not currently hosted or deployed publicly.


