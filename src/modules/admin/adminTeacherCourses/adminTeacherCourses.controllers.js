import { Op } from 'sequelize'
import Course from '../../../../DB/models/course.model.js'
import Employee from '../../../../DB/models/employee.mode.js'
import TeachersCourses from '../../../../DB/models/junctionTables/teacherCourse.model.js'

export const getAllTeachersCourses = async (req, res, next) => {
  const { teacherId, courseId } = req.query

  let query = {}
  teacherId && (query.tblEmployeeId = teacherId)
  courseId && (query.tblCourseId = courseId)
  const teachersCourses = await TeachersCourses.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All teachers Courses',
    teachersCourses,
  })
}

/**
 * check if course is existed
 * check if the employee is existed
 * check if the employee is teacher
 * check if the course and teacher is already existed
 * check if the teacher is the same specialization of the course
 * create
 */
export const createTeachersCourses = async (req, res, next) => {
  const { courseId, teacherId } = req.body

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No course with this id', { cause: 404 }))

  if (!isCourseExisted.isActive)
    return next(
      new Error("can't add teacher-course for inactive course", { cause: 409 })
    )

  const isTeacherExisted = await Employee.findByPk(teacherId)
  if (!isTeacherExisted)
    return next(new Error('No Employee with this id', { cause: 404 }))
  if (isTeacherExisted.employeeType !== 'teacher')
    return next(new Error('This employee is not teacher', { cause: 409 }))

  const isTeacherCourseExisted = await TeachersCourses.findOne({
    where: { tblEmployeeId: teacherId, tblCourseId: courseId },
  })
  if (isTeacherCourseExisted)
    return next(
      new Error('Teacher and Course record is already existed', { cause: 409 })
    )

  if (isTeacherExisted.specialization !== isCourseExisted.specialization)
    return next(
      new Error("Teacher and Course haven't same specialization", {
        cause: 409,
      })
    )

  const newTeacherCourse = await TeachersCourses.create({
    tblEmployeeId: teacherId,
    tblCourseId: courseId,
  })
  if (!newTeacherCourse)
    return next(new Error('Error while creating teacher course record'))

  res.status(201).json({ message: 'Teacher Course Record', newTeacherCourse })
}

/**
 *
 * @param {teacherCourseId}
 * @body {teacherId, courseId}
 * check if TeachersCourse is existed
 * check if employee is existed
 * check if employee is teacher
 * check if teacher has the same specialization of the previous teacher
 * check if course is existed
 * check if course has the same specialization of the previous course
 * check if new data is already existed in table
 * update them
 */
export const updateTeachersCourses = async (req, res, next) => {
  const { teacherCourseId } = req.params
  const { teacherId, courseId } = req.body

  const isTeacherCourseExisted = await TeachersCourses.findByPk(
    teacherCourseId,
    { include: [{ model: Employee }, { model: Course }] }
  )
  if (!isTeacherCourseExisted)
    return next(new Error('No teacher-course with this id'), { cause: 404 })

  if (teacherId) {
    const isEmployeeExisted = await Employee.findByPk(teacherId)
    if (!isEmployeeExisted)
      return next(new Error('No Employee with this id', { cause: 404 }))

    if (isEmployeeExisted.employeeType !== 'teacher')
      return next(new Error('This employee is not teacher', { cause: 409 }))

    if (
      isEmployeeExisted.specialization !==
      isTeacherCourseExisted.tbl_employee.specialization
    )
      return next(
        new Error("This Teacher hasn't got the same specialization", {
          cause: 409,
        })
      )

    isTeacherCourseExisted.tblEmployeeId = teacherId
  }

  if (courseId) {
    const isCourseExisted = await Course.findByPk(courseId)
    if (!isCourseExisted)
      return next(new Error('No course with this id', { cause: 404 }))

    if (!isCourseExisted.isActive)
      return next(
        new Error("can't add teacher-course for inactive course", {
          cause: 409,
        })
      )

    if (
      isCourseExisted.specialization !==
      isTeacherCourseExisted.tbl_course.specialization
    )
      return next(
        new Error("This Course hasn't got the same specialization", {
          cause: 409,
        })
      )

    isTeacherCourseExisted.tblCourseId = courseId
  }
  const isUpdatedTeacherCourseExisted = await TeachersCourses.findOne({
    where: {
      id: { [Op.ne]: teacherCourseId },
      tblEmployeeId: isTeacherCourseExisted.tblEmployeeId,
      tblCourseId: isTeacherCourseExisted.tblCourseId,
    },
  })

  if (isUpdatedTeacherCourseExisted)
    return next(
      new Error("There's already teacher-course existed", { cause: 409 })
    )

  const updatedTeacherCourse = await isTeacherCourseExisted.save()

  res.status(200).json({
    message: 'Updated Teacher-Course successfully',
    updatedTeacherCourse,
  })
}

export const deleteTeachersCourses = async (req, res, next) => {
  const { teacherCourseId } = req.params

  const isTeacherCourseExisted = await TeachersCourses.findByPk(teacherCourseId)
  if (!isTeacherCourseExisted)
    return next(new Error('No teacher-course with this id'), { cause: 404 })

  const deletedTeacherCourse = await isTeacherCourseExisted.destroy()
  if (!deletedTeacherCourse) {
    return next(new Error('Error While deleting teacher-course'))
  }
  res.status(200).json({
    message: 'Teacher-Course has been deleted successfully',
  })
}
export const restoreTeachersCourses = async (req, res, next) => {
  const { teacherCourseId } = req.params
  const isTeacherCourseExisted = await TeachersCourses.findByPk(
    teacherCourseId,
    {
      paranoid: false,
    }
  )
  if (!isTeacherCourseExisted)
    return next(new Error('No Teacher-Course with this id', { cause: 404 }))

  const restoredTeacherCourse = await isTeacherCourseExisted.restore()

  if (!restoredTeacherCourse)
    return next(new Error('Error while restoring Teacher-Course'))

  res.status(200).json({
    message: 'Teacher-Course has been restored successfully',
    restoredCourse,
  })
}
