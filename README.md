# School Management System App

A School Management System App, using NodeJS runtime environment and ExpressJS as the server framework.

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [File Structure](#file-structure)
- [ERD](#erd)
- [Endpoints](#endpoints)

## Prerequisites

Before you run the API, make sure you have the following prerequisites installed:

**SQL Server:** Ensure you have any DBMS installed, to be able to deal with SQL database.

## Installation

To install dependencies:

```bash
npm install
```

## Running the API

To run in dev mode:

```bash
npm run dev
```

## File Structure

Following ExpressJS Structure:

- DB : for DB connection and Entities Schemas
- Src : for middlewares, modules (controllers,routes) , utils

```
  ├── DB
  |   ├── models
  |   |      ├── associations
  |   |      |        └── associations.js
  |   |      ├── junctionTables
  |   |      |        ├── studentClassroom.map.js
  |   |      |        ├── studentCourse.map.js
  |   |      |        ├── teacherClassroom.map.js
  |   |      |        └── teacherCourse.map.js
  |   |      ├── admin.model.js
  |   |      ├── classRoom.model.js
  |   |      ├── course.model.js
  |   |      ├── courseResult.model.js
  |   |      ├── employee.model.js
  |   |      ├── finance.model.js
  |   |      └── student.model.js
  |   └── connection.js
  ├── src
  |   ├── middlewares
  |   |      ├── authenticationHandler.js
  |   |      ├── authorizationHandler.js
  |   |      ├── dataValidationHandler.js
  |   |      ├── filesUploadingHandler.js
  |   |      └── globalErrorHandler.js
  │   ├── modules
  |   |      ├── admin
  |   |      |      ├── adminClassroom
  |   |      |      |          ├── adminClassroom.controllers.js
  |   |      |      |          ├── adminClassroom.dataValidationSchemas.js
  |   |      |      |          └── adminClassroom.routes.js
  |   |      |      ├── adminCourse
  |   |      |      |          ├── adminCourse.controllers.js
  |   |      |      |          ├── adminCourse.dataValidationSchemas.js
  |   |      |      |          └── adminCourse.routes.js
  |   |      |      ├── adminCourseResults
  |   |      |      |          ├── adminCourseResults.controllers.js
  |   |      |      |          ├── adminCourseResults.dataValidationSchemas.js
  |   |      |      |          └── adminCourseResults.routes.js
  |   |      |      ├── adminEmployee
  |   |      |      |          ├── adminEmployee.controllers.js
  |   |      |      |          ├── adminEmployee.dataValidationSchemas.js
  |   |      |      |          └── adminEmployee.routes.js
  |   |      |      ├── adminFinance
  |   |      |      |          ├── adminFinance.controllers.js
  |   |      |      |          ├── adminFinance.dataValidationSchemas.js
  |   |      |      |          └── adminFinance.routes.js
  |   |      |      ├── adminStudent
  |   |      |      |          ├── adminStudent.controllers.js
  |   |      |      |          ├── adminStudent.dataValidationSchemas.js
  |   |      |      |          └── adminStudent.routes.js
  |   |      |      ├── adminStudentClassrooms
  |   |      |      |          ├── adminStudentClassrooms.controllers.js
  |   |      |      |          ├── adminStudentClassrooms.dataValidationSchemas.js
  |   |      |      |          └── adminStudentClassrooms.routes.js
  |   |      |      ├── adminStudentCourses
  |   |      |      |          ├── adminStudentCourses.controllers.js
  |   |      |      |          ├── adminStudentCourses.dataValidationSchemas.js
  |   |      |      |          └── adminStudentCourses.routes.js
  |   |      |      ├── adminTeacherClassrooms
  |   |      |      |          ├── adminTeacherClassrooms.controllers.js
  |   |      |      |          ├── adminTeacherClassrooms.dataValidationSchemas.js
  |   |      |      |          └── adminTeacherClassrooms.routes.js
  |   |      |      ├── adminTeacherCourses
  |   |      |      |          ├── adminTeacherCourses.controllers.js
  |   |      |      |          ├── adminTeacherCourses.dataValidationSchemas.js
  |   |      |      |          └── adminTeacherCourses.routes.js
  |   |      |      ├── admin.nested.routes.js
  |   |      |      ├── admin.controllers.js
  |   |      |      ├── admin.dataValidationSchemas.js
  |   |      |      └── admin.routes.js
  |   |      ├── auth
  |   |      |      ├── auth.controller.js
  |   |      |      ├── auth.dataValidationSchemas.js
  |   |      |      └── auth.routes.js
  |   |      ├── employee
  |   |      |      ├── employee.controller.js
  |   |      |      ├── employee.dataValidationSchemas.js
  |   |      |      └── employee.routes.js
  |   |      └── student
  |   |             ├── student.controller.js
  |   |             ├── student.dataValidationSchemas.js
  |   |             └── student.routes.js
  |   └──  utils
  |          ├── allowedExtensions.js
  |          ├── createAdmin.js
  |          ├── generalConstants.js
  |          ├── generateTokenHandler.js
  |          └── mediaHostConnection.js
  ├── .env
  ├── index.js
  ├── README.md
  └── .gitignore
```

## ERD

<img alt="school management system ERD" src="./School Management System.png"  />

## Endpoints

### Live URL : https://schoolmanagementsystem-150u.onrender.com/

### Check APIs Documentation : https://documenter.getpostman.com/view/27228437/2sA3JM8hGz

### Admin Dashboard

| Method | URL                                                              | Description                |
| ------ | ---------------------------------------------------------------- | -------------------------- |
| GET    | `/employee`                                                      | Get employees              |
| GET    | `/employee/getEmployeeByEmail`                                   | Get employee by email      |
| POST   | `/employee/createEmployee`                                       | Create employee            |
| PUT    | `/employee/updateEmployee`                                       | Update employee            |
| PUT    | `/employee/restoreEmployee/:employeeId`                          | Restore employee           |
| DELETE | `/employee/deleteEmployee`                                       | Delete employee            |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/student`                                                       | Get students               |
| GET    | `/student/getStudentByEmail`                                     | Get student by email       |
| POST   | `/student/createStudent`                                         | Create student             |
| PUT    | `/student/updateStudent`                                         | Update student             |
| PUT    | `/student/restoreStudent/:studentId`                             | Restore student            |
| DELETE | `/student/deleteStudent`                                         | Delete student             |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/course`                                                        | Get courses                |
| POST   | `/course/createCourse`                                           | Create course              |
| GET    | `/course/:courseId`                                              | Get course by id           |
| PUT    | `/course/:courseId`                                              | Update course              |
| PUT    | `/course/changeCourseState/:courseId`                            | Update course state        |
| PUT    | `/course/restorecourse/:courseId`                                | Restore course             |
| DELETE | `/course/:courseId`                                              | Delete course              |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/finance`                                                       | Get finances               |
| POST   | `/finance/addFinanceData`                                        | Create finance             |
| PUT    | `/finance/updateFinanceData/:financeYear`                        | Update finance             |
| PUT    | `/finance/restoreFinanceData/:financeId`                         | Restore finance            |
| DELETE | `/finance/deleteFinanceData/:financeYear`                        | Delete finance             |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/classroom`                                                     | Get classrooms             |
| GET    | `/classroom/courseClassrooms/:courseId`                          | Get course's classrooms    |
| POST   | `/classroom`                                                     | Create classroom           |
| GET    | `/classroom/:classroomId`                                        | Get classroom by id        |
| PUT    | `/classroom/:classroomId`                                        | Update classroom           |
| PUT    | `/classroom/changeClassroomState/:classroomId`                   | Update classroom state     |
| PUT    | `/classroom/restoreClassroom/:classroomId`                       | Restore classroom          |
| DELETE | `/classroom/:classroomId`                                        | Delete classroom           |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/courseResults`                                                 | Get courseResults          |
| GET    | `/courseResults/:courseResultId`                                 | Get courseResult by id     |
| GET    | `/courseResults/course/:courseId`                                | Get course's courseResults |
| GET    | `/courseResults/student/:studentId`                              | Get course's courseResults |
| POST   | `/courseResults/addCourseResult`                                 | Create courseResult        |
| PUT    | `/courseResults/:courseResultId`                                 | Update courseResult        |
| PUT    | `/courseResults/changecourseResultsState/:courseResultId`        | Update courseResult state  |
| PUT    | `/courseResults/restoreCourseResult/:courseResultId`             | Restore courseResult       |
| DELETE | `/courseResults/:courseResultId`                                 | Delete courseResult        |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/teacherCourses`                                                | Get teacherCourses         |
| POST   | `/teacherCourses/addTeacherCourses`                              | Create teacherCourse       |
| PUT    | `/teacherCourses/:teacherCourseId`                               | Update teacherCourse       |
| PUT    | `/teacherCourses/restoreTeacherCourse/:teacherCourseId`          | Restore teacherCourse      |
| DELETE | `/teacherCourses/:teacherCourseId`                               | Delete teacherCourse       |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/teacherClassrooms`                                             | Get teacherClassrooms      |
| POST   | `/teacherClassrooms/addTeacherClassroom`                         | Create teacherClassroom    |
| PUT    | `/teacherClassrooms/:teacherClassroomId`                         | Update teacherClassroom    |
| PUT    | `/teacherClassrooms/restoreTeacherClassroom/:teacherClassroomId` | Restore teacherClassroom   |
| DELETE | `/teacherClassrooms/:teacherClassroomId`                         | Delete teacherClassroom    |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/studentCourses`                                                | Get studentCourses         |
| POST   | `/studentCourses/addStudentCourses`                              | Create studentCourse       |
| PUT    | `/studentCourses/:studentCourseId`                               | Update studentCourse       |
| PUT    | `/studentCourses/restoreStudentCourse/:studentCourseId`          | Restore studentCourse      |
| DELETE | `/studentCourses/:studentCourseId`                               | Delete studentCourse       |
| -----  | -----------------------------------                              | ------                     |
| GET    | `/studentClassrooms`                                             | Get studentClassrooms      |
| POST   | `/studentClassrooms/addStudentClassroom`                         | Create studentClassroom    |
| PUT    | `/studentClassrooms/:studentClassroomId`                         | Update studentClassroom    |
| PUT    | `/studentClassrooms/restoreStudentClassroom/:studentClassroomId` | Restore studentClassroom   |
| DELETE | `/studentClassrooms/:studentClassroomId`                         | Delete studentClassroom    |

### Auth

| Method | URL            | Description                  |
| ------ | -------------- | ---------------------------- |
| POST   | `/auth/signIn` | Login as student or Employee |

### Employee

| Method | URL                                                     | Description                    |
| ------ | ------------------------------------------------------- | ------------------------------ |
| GET    | `/employee/myProfile`                                   | Get private profile            |
| GET    | `/employee/profile/:employeeId`                         | Get public profile             |
| PUT    | `/employee/myProfile`                                   | Update profile                 |
| GET    | `/employee/classroom`                                   | Get all classrooms             |
| POST   | `/employee/classroom`                                   | Create classroom               |
| GET    | `/employee/classroom/:classroomId`                      | Get classroom by id            |
| PUT    | `/employee/classroom/:classroomId`                      | Update classroom by id         |
| DELETE | `/employee/classroom/:classroomId`                      | Delete classroom by id         |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/course`                                      | Get all courses                |
| POST   | `/employee/course`                                      | Create course                  |
| GET    | `/employee/course/:courseId`                            | Get course by id               |
| PUT    | `/employee/course/:courseId`                            | Update course by id            |
| DELETE | `/employee/course/:courseId`                            | Delete course by id            |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/courseResults`                               | Get all courseResults          |
| POST   | `/employee/courseResults`                               | Create courseResults           |
| GET    | `/employee/courseResults/:courseResultsId`              | Get courseResults by id        |
| PUT    | `/employee/courseResults/:courseResultsId`              | Update courseResults by id     |
| DELETE | `/employee/courseResults/:courseResultsId`              | Delete courseResults by id     |
| PUT    | `/employee/restoreCourseResult/:courseResultId`         | Restore courseResults by id    |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/students`                                    | Get all students               |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/teacherCourse`                               | Get all teacherCourses         |
| POST   | `/employee/teacherCourse`                               | Create teacherCourse           |
| GET    | `/employee/teacherCourse/:teacherCourseId`              | Get teacherCourse by id        |
| PUT    | `/employee/teacherCourse/:teacherCourseId`              | Update teacherCourse by id     |
| DELETE | `/employee/teacherCourse/:teacherCourseId`              | Delete teacherCourse by id     |
| PUT    | `/employee/restoreTeacherCourse/:teacherCourseId`       | Restore teacherCourse by id    |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/teacherClassroom`                            | Get all teacherClassrooms      |
| POST   | `/employee/teacherClassroom`                            | Create teacherClassroom        |
| GET    | `/employee/teacherClassroom/:teacherClassroomId`        | Get teacherClassroom by id     |
| PUT    | `/employee/teacherClassroom/:teacherClassroomId`        | Update teacherClassroom by id  |
| DELETE | `/employee/teacherClassroom/:teacherClassroomId`        | Delete teacherClassroom by id  |
| PUT    | `/employee/restoreTeacherClassroom/:teacherClassroomId` | Restore teacherClassroom by id |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/studentCourse`                               | Get all studentCourses         |
| POST   | `/employee/studentCourse`                               | Create studentCourse           |
| GET    | `/employee/studentCourse/:studentCourseId`              | Get studentCourse by id        |
| PUT    | `/employee/studentCourse/:studentCourseId`              | Update studentCourse by id     |
| DELETE | `/employee/studentCourse/:studentCourseId`              | Delete studentCourse by id     |
| PUT    | `/employee/restoreStudentCourse/:studentCourseId`       | Restore studentCourse by id    |
| -----  | -----------------------------------                     | ------                         |
| GET    | `/employee/studentClassroom`                            | Get all studentClassrooms      |
| POST   | `/employee/studentClassroom`                            | Create studentClassroom        |
| GET    | `/employee/studentClassroom/:studentClassroomId`        | Get studentClassroom by id     |
| PUT    | `/employee/studentClassroom/:studentClassroomId`        | Update studentClassroom by id  |
| DELETE | `/employee/studentClassroom/:studentClassroomId`        | Delete studentClassroom by id  |
| PUT    | `/employee/restoreStudentClassroom/:studentClassroomId` | Restore studentClassroom by id |

### Student

| Method | URL                     | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/student/myProfile`    | Get private profile    |
| PUT    | `/student/myProfile`    | Update private profile |
| GET    | `/student/myClassrooms` | Get my classrooms      |
| GET    | `/student/myCourses`    | Get my courses         |
| GET    | `/student/myResults`    | Get my courses results |
