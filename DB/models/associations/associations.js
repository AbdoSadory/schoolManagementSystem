import ClassRoom from '../classRoom.model.js'
import Course from '../course.model.js'
import Employee from '../employee.mode.js'
import Student from '../student.model.js'
import StudentsClassRooms from '../junctionTables/studentClassRooms.model.js'
import TeachersCourses from '../junctionTables/teacherCourse.model.js'
import TeachersClassRooms from '../junctionTables/teachersClassRooms.model.js'
import StudentsCourses from '../junctionTables/studentCourse.model.js'
import CourseResults from '../courseResults.model.js'

export const allAssociations = () => {
  // ======================= Employee to ClassRoom Many-To-Many ============== //
  Employee.belongsToMany(ClassRoom, {
    through: TeachersClassRooms,
  })
  ClassRoom.belongsToMany(Employee, {
    through: TeachersClassRooms,
  })
  Employee.hasMany(TeachersClassRooms, {
    foreignKey: { name: 'tblEmployeeId' },
  })
  TeachersClassRooms.belongsTo(Employee)
  ClassRoom.hasMany(TeachersClassRooms, {
    foreignKey: { name: 'tblClassRoomId' },
  })
  TeachersClassRooms.belongsTo(ClassRoom)
  // ======================= Employee to Course Many-To-Many ============== //
  Employee.belongsToMany(Course, {
    through: TeachersCourses,
  })
  Course.belongsToMany(Employee, {
    through: TeachersCourses,
  })
  Employee.hasMany(TeachersCourses, { foreignKey: { name: 'tblEmployeeId' } })
  TeachersCourses.belongsTo(Employee)
  Course.hasMany(TeachersCourses, { foreignKey: { name: 'tblCourseId' } })
  TeachersCourses.belongsTo(Course)
  // ======================= Student to ClassRoom Many-To-Many ============== //
  Student.belongsToMany(ClassRoom, {
    through: StudentsClassRooms,
  })
  ClassRoom.belongsToMany(Student, {
    through: StudentsClassRooms,
  })
  Student.hasMany(StudentsClassRooms, { foreignKey: { name: 'tblStudentId' } })
  StudentsClassRooms.belongsTo(Student)
  ClassRoom.hasMany(StudentsClassRooms, {
    foreignKey: { name: 'tblClassRoomId' },
  })
  StudentsClassRooms.belongsTo(ClassRoom)
  // ======================= Student to Course Many-To-Many ============== //
  Student.belongsToMany(Course, {
    through: StudentsCourses,
  })
  Course.belongsToMany(Student, {
    through: StudentsCourses,
  })
  Student.hasMany(StudentsCourses, { foreignKey: { name: 'tblStudentId' } })
  StudentsCourses.belongsTo(Student)
  Course.hasMany(StudentsCourses, {
    foreignKey: { name: 'tblCourseId' },
  })
  StudentsCourses.belongsTo(Course)
  // ======================= Student to CourseResults One-To-Many ============== //
  Student.hasMany(CourseResults, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  CourseResults.belongsTo(Student)
  // ======================= Course to CourseResults One-To-Many ============== //
  Course.hasMany(CourseResults, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  CourseResults.belongsTo(Course)
  // ======================= Course to ClassRoom One-To-Many ============== //
  Course.hasMany(ClassRoom, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  ClassRoom.belongsTo(Course)

  CourseResults.sync({ alter: true })
  ClassRoom.sync({ alter: true })
}

export default allAssociations
