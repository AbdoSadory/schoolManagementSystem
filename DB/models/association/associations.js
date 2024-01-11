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
    foreignKey: { name: 'teacherId' },
  })
  ClassRoom.belongsToMany(Employee, {
    through: TeachersClassRooms,
    foreignKey: { name: 'classRoomId' },
  })
  // ======================= Employee to Course Many-To-Many ============== //
  Employee.belongsToMany(Course, {
    through: TeachersCourses,
    foreignKey: { name: 'teacherId' },
  })
  Course.belongsToMany(Employee, {
    through: TeachersCourses,
    foreignKey: { name: 'courseId' },
  })
  // ======================= Student to ClassRoom Many-To-Many ============== //
  Student.belongsToMany(ClassRoom, {
    through: StudentsClassRooms,
    foreignKey: { name: 'studentId' },
  })
  ClassRoom.belongsToMany(Student, {
    through: StudentsClassRooms,
    foreignKey: { name: 'classRoomId' },
  })
  // ======================= Student to Course Many-To-Many ============== //
  Student.belongsToMany(Course, {
    through: StudentsCourses,
    foreignKey: { name: 'studentId' },
  })
  Course.belongsToMany(Student, {
    through: StudentsCourses,
    foreignKey: { name: 'courseId' },
  })
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
