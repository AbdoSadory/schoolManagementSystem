import { Op } from 'sequelize'
import Course from '../../../../DB/models/course.model.js'
import StudentsCourses from '../../../../DB/models/junctionTables/studentCourse.model.js'
import Student from '../../../../DB/models/student.model.js'

export const getAllStudentCourses = async (req, res, next) => {
  const { studentId, courseId } = req.query

  let query = {}
  studentId && (query.tblStudentId = studentId)
  courseId && (query.tblCourseId = courseId)
  const studentsCourses = await StudentsCourses.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All Students Courses',
    studentsCourses,
  })
}

/**
 * check if course is existed
 * check if student is existed
 * check if students grade is the same like course's grade
 * check if the student and course is already existed
 * create
 */
export const createStudentsCourses = async (req, res, next) => {
  const { courseId, studentId } = req.body

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No course with this id', { cause: 404 }))

  const isStudentExisted = await Student.findByPk(studentId)
  if (!isStudentExisted)
    return next(new Error('No Student with this id', { cause: 404 }))
  if (isStudentExisted.grade !== isCourseExisted.grade)
    return next(
      new Error("This student's grade is not the same the course's grade", {
        cause: 409,
      })
    )

  const isStudentCourseExisted = await StudentsCourses.findOne({
    where: { tblStudentId: studentId, tblCourseId: courseId },
  })
  if (isStudentCourseExisted)
    return next(
      new Error('Student and Course record is already existed', { cause: 409 })
    )

  const newStudentCourse = await StudentsCourses.create({
    tblStudentId: studentId,
    tblCourseId: courseId,
  })
  if (!newStudentCourse)
    return next(new Error('Error while creating student course record'))

  res.status(201).json({ message: 'Student Course Record', newStudentCourse })
}

/**
 *
 * @param {studentCourseId}
 * @body {studentId, courseId}
 * check if StudentsCourses is existed
 * check if new data is already existed in table
 * check if student is existed
 * check if student has the same grade of the course
 * check if course is existed
 * check if course has the same grade of the student
 * update them
 */
export const updateStudentsCourses = async (req, res, next) => {
  const { studentCourseId } = req.params
  const { studentId, courseId } = req.body

  const isStudentCourseExisted = await StudentsCourses.findByPk(
    studentCourseId,
    { include: [{ model: Student }, { model: Course }] }
  )
  if (!isStudentCourseExisted)
    return next(new Error('No student-course with this id'), { cause: 404 })

  const isUpdatedStudentCourseExisted = await StudentsCourses.findOne({
    where: {
      id: { [Op.ne]: studentCourseId },
      tblStudentId: studentId || isStudentCourseExisted.tblStudentId,
      tblCourseId: courseId || isStudentCourseExisted.tblCourseId,
    },
  })

  if (isUpdatedStudentCourseExisted)
    return next(
      new Error("There's already student-course existed", { cause: 409 })
    )
  if (studentId) {
    const isStudentExisted = await Student.findByPk(studentId)
    if (!isStudentExisted)
      return next(new Error('No Student with this id', { cause: 404 }))

    if (isStudentExisted.grade !== isStudentCourseExisted.tbl_course.grade)
      return next(
        new Error("This student's grade is not the same the course's grade", {
          cause: 409,
        })
      )

    isStudentCourseExisted.tblStudentId = studentId
  }

  if (courseId) {
    const isCourseExisted = await Course.findByPk(courseId)
    if (!isCourseExisted) return next(new Error('No course with this id'))

    if (isCourseExisted.grade !== isStudentCourseExisted.tbl_student.grade)
      return next(
        new Error("This course's grade is not the same the student's grade", {
          cause: 409,
        })
      )

    isStudentCourseExisted.tblCourseId = courseId
  }

  const updatedStudentCourse = await isStudentCourseExisted.save()

  res.status(200).json({
    message: 'Updated Student-Course successfully',
    updatedStudentCourse,
  })
}

export const deleteStudentsCourses = async (req, res, next) => {
  const { studentCourseId } = req.params

  const isStudentCourseExisted = await StudentsCourses.findByPk(studentCourseId)
  if (!isStudentCourseExisted)
    return next(new Error('No student-course with this id'), { cause: 404 })

  const deletedStudentCourse = await StudentsCourses.destroy({
    where: { id: studentCourseId },
    force: true,
  })
  if (!deletedStudentCourse) {
    return next(new Error('Error While deleting student-course'))
  }
  res.status(200).json({
    message: 'Student-Course has been deleted successfully',
  })
}
