import { Op } from 'sequelize'
import ClassRoom from '../../../../DB/models/classRoom.model.js'
import Course from '../../../../DB/models/course.model.js'
import Employee from '../../../../DB/models/employee.mode.js'
import StudentsClassRooms from '../../../../DB/models/junctionTables/studentClassRooms.model.js'
import Student from '../../../../DB/models/student.model.js'
import StudentsCourses from '../../../../DB/models/junctionTables/studentCourse.model.js'

export const getAllStudentsClassrooms = async (req, res, next) => {
  const { studentId, classroomId } = req.query
  let query = {}
  studentId && (query.tblStudentId = studentId)
  classroomId && (query.tblClassRoomId = classroomId)
  const studentsClassrooms = await StudentsClassRooms.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All students Classrooms',
    studentsClassrooms,
  })
}

/**
 * check if classroom is existed
 * check if the Student is existed
 * check if the student classroom is existed
 * check if the student course is existed
 * check if the student has enrolled to this course
 * create
 */
export const createStudentsClassroom = async (req, res, next) => {
  const { classroomId, studentId } = req.body
  //  check if classroom is existed
  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: { model: Course },
  })
  console.log(isClassroomExisted)
  if (!isClassroomExisted) return next(new Error('No classroom with this id'))

  //  check if the Student is existed
  const isStudentExisted = await Student.findByPk(studentId)
  if (!isStudentExisted) return next(new Error('No Student with this id'))

  // check if the student classroom is existed
  const isStudentClassroomExisted = await StudentsClassRooms.findOne({
    where: { tblStudentId: studentId, tblClassRoomId: classroomId },
  })
  if (isStudentClassroomExisted)
    return next(new Error('Student and Classroom record is already existed'))

  // check if the student has enrolled to this course
  const isStudentEnrolledToTheCourse = await StudentsCourses.findOne({
    where: {
      tblStudentId: studentId,
      tblCourseId: isClassroomExisted.tblCourseId,
    },
  })

  if (!isStudentEnrolledToTheCourse)
    return next(
      new Error("Student hasn't enrolled to this course of this classroom.", {
        cause: 409,
      })
    )

  // check if the student course is existed
  const newStudentClassroom = await StudentsClassRooms.create({
    tblStudentId: studentId,
    tblClassRoomId: classroomId,
  })
  if (!newStudentClassroom)
    return next(new Error('Error while creating student classroom record'))

  res
    .status(201)
    .json({ message: 'Student Classroom Record', newStudentClassroom })
}

/**

 * @param {studentClassroomId}
 * @body {studentId, classroomId}
 * check if StudentClassroom is existed
 * check if new data is already existed in table
 * check if student is existed
 * check if student has enrolled to the course
 * update student
 * check if classroom is existed
 * check if student has enrolled to the course of the new classroom
 * update classroom
 * 
 */
export const updateStudentsClassroom = async (req, res, next) => {
  const { studentClassroomId } = req.params
  const { studentId, classroomId } = req.body

  const isStudentClassroomExisted = await StudentsClassRooms.findByPk(
    studentClassroomId,
    {
      include: [{ model: Student }, { model: ClassRoom }],
    }
  )
  if (!isStudentClassroomExisted)
    return next(new Error('No student-classroom with this id'), { cause: 404 })

  if (studentId) {
    const isStudentExisted = await Student.findByPk(studentId)
    if (!isStudentExisted)
      return next(new Error('No Student with this id', { cause: 404 }))

    const isStudentEnrolledToTheCourse = await StudentsCourses.findOne({
      where: {
        tblStudentId: studentId,
        tblCourseId: isStudentClassroomExisted.tbl_classRoom.tblCourseId,
      },
    })

    if (!isStudentEnrolledToTheCourse)
      return next(
        new Error("Student hasn't enrolled to this course.", {
          cause: 409,
        })
      )
    isStudentClassroomExisted.tblStudentId = studentId
  }

  if (classroomId) {
    const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
      include: { model: Course },
    })
    if (!isClassroomExisted) return next(new Error('No classroom with this id'))

    const isStudentEnrolledToTheCourse = await StudentsCourses.findOne({
      where: {
        tblStudentId: isStudentClassroomExisted.tblStudentId,
        tblCourseId: isClassroomExisted.tbl_course.id,
      },
    })
    if (!isStudentEnrolledToTheCourse)
      return next(
        new Error("Student hasn't enrolled to this classroom's course .", {
          cause: 409,
        })
      )
    isStudentClassroomExisted.tblClassRoomId = classroomId
  }

  const isUpdatedStudentClassroomExisted = await StudentsClassRooms.findOne({
    where: {
      id: { [Op.ne]: studentClassroomId },
      tblStudentId: isStudentClassroomExisted.tblStudentId,
      tblClassRoomId: isStudentClassroomExisted.tblClassRoomId,
    },
  })

  if (isUpdatedStudentClassroomExisted)
    return next(
      new Error("There's already student-classroom existed", { cause: 409 })
    )

  const updatedStudentClassroom = await isStudentClassroomExisted.save()

  res.status(200).json({
    message: 'Updated Student-Classroom successfully',
    updatedStudentClassroom,
  })
}

export const deleteStudentsCourses = async (req, res, next) => {
  const { studentClassroomId } = req.params

  const isStudentClassroomExisted = await StudentsClassRooms.findByPk(
    studentClassroomId
  )
  if (!isStudentClassroomExisted)
    return next(new Error('No Student-Classroom with this id'), { cause: 404 })

  const deletedStudentClassroom = await StudentsClassRooms.destroy({
    where: { id: studentClassroomId },
  })
  if (!deletedStudentClassroom) {
    return next(new Error('Error While deleting student-classroom'))
  }
  res.status(200).json({
    message: 'Student-Classroom has been deleted successfully',
  })
}
