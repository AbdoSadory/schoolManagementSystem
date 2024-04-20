import Course from '../../../../DB/models/course.model.js'
import { Op } from 'sequelize'
import CourseResults from '../../../../DB/models/courseResults.model.js'

export const getAllCourses = async (req, res, next) => {
  const { title, specialization, learningMode, grade, isActive } = req.query
  let courses
  let query = {}
  title && (query.title = { [Op.substring]: title })
  specialization && (query.specialization = specialization)
  learningMode && (query.learningMode = learningMode)
  grade && (query.grade = grade)
  if (isActive === 'true' || isActive === 'false') {
    let courseState = isActive === 'true' ? true : false
    query.isActive = courseState
  }
  courses = await Course.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All Courses',
    courses: courses.length ? courses : 'No Courses',
  })
}

export const getCourseUsingId = async (req, res, next) => {
  const { courseId } = req.params

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No Course with this id', { cause: 404 }))

  res.status(200).json({ message: 'Course', course: isCourseExisted })
}
// ========================== Create Course ===================//
export const createCourse = async (req, res, next) => {
  const { title, description, specialization, learningMode, grade, isActive } =
    req.body
  // check by title, specialization, grade, learningMode bc description is dynamic
  const isCourseExisted = await Course.findOne({
    where: {
      title,
      specialization,
      grade,
      learningMode,
      isActive,
    },
  })
  if (isCourseExisted)
    return next(new Error('This Course is already existed', { cause: 409 }))

  const newCourse = await Course.create({
    title,
    description,
    specialization,
    learningMode,
    grade,
    isActive,
  })
  if (!newCourse) {
    return next(new Error('Error While Creating Course'))
  }
  res.json({ message: 'New Course', newCourse })
}

// ========================== change Course State ===================//
export const changeCourseState = async (req, res, next) => {
  const { isActive } = req.body
  const { courseId } = req.params

  const isCourseExisted = await Course.findOne({
    where: { id: courseId },
  })
  if (!isCourseExisted) {
    return next(
      new Error('This course is not existed', {
        cause: 404,
      })
    )
  }

  isCourseExisted.isActive = isActive

  const updatedCourse = await isCourseExisted.save()
  if (!updatedCourse) {
    return next(new Error('Error while changing The course state'))
  }
  res.status(200).json({ message: 'Change Course State', updatedCourse })
}

// ========================== update Course ===================//
export const updateCourse = async (req, res, next) => {
  const { title, description, specialization, learningMode, grade, isActive } =
    req.body
  const { courseId } = req.params

  const isCourseExisted = await Course.findOne({
    where: { id: courseId },
  })
  if (!isCourseExisted) {
    return next(
      new Error('This course is not existed', {
        cause: 404,
      })
    )
  }

  const isUpdatedCourseExisted = await Course.findOne({
    where: {
      id: { [Op.ne]: courseId },
      title: title || isCourseExisted.title,
      specialization: specialization || isCourseExisted.specialization,
      learningMode: learningMode || isCourseExisted.learningMode,
      grade: grade || isCourseExisted.grade,
      isActive: isActive || isCourseExisted.isActive,
    },
  })

  if (isUpdatedCourseExisted)
    return next(
      new Error('This course with new values is already existed', {
        cause: 409,
      })
    )

  title && (isCourseExisted.title = title)
  description && (isCourseExisted.description = description)
  specialization && (isCourseExisted.specialization = specialization)
  learningMode && (isCourseExisted.learningMode = learningMode)
  grade && (isCourseExisted.grade = grade)
  isActive && (isCourseExisted.isActive = isActive)

  const updatedCourse = await isCourseExisted.save()
  if (!updatedCourse) {
    return next(new Error('Error while updating The course'))
  }
  res.status(200).json({ message: 'Updated Course', updatedCourse })
}
// ========================== delete Course ===================//
export const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params
  const isCourseExisted = await Course.findOne({
    where: {
      id: courseId,
    },
  })
  if (!isCourseExisted) {
    return next(
      new Error('This Course is not existed', {
        cause: 404,
      })
    )
  }
  const deletedCourse = await isCourseExisted.destroy()
  if (!deletedCourse) {
    return next(new Error('Error While deleting Course'))
  }

  res.status(200).json({ message: 'Course has been deleted successfully' })
}

// ========================== restore Course ===================//
export const restoreCourse = async (req, res, next) => {
  const { courseId } = req.params
  const isCourseExisted = await Course.findByPk(courseId, {
    paranoid: false,
  })
  if (!isCourseExisted)
    return next(new Error('No Course with this id', { cause: 404 }))

  const restoredCourse = await isCourseExisted.restore()

  if (!restoredCourse) return next(new Error('error while restoring course'))

  res.status(200).json({
    message: 'Course has been restored successfully',
    restoredCourse,
  })
}
