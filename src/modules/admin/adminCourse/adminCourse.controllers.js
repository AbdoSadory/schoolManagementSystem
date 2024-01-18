import bcryptjs from 'bcryptjs'
import cloudinaryConnection from '../../../utils/mediaHostConnection.js'
import Course from '../../../../DB/models/course.model.js'
import { Op } from 'sequelize'

export const getAllCourses = async (req, res, next) => {
  const { title, specialization, learningMode, grade } = req.query
  let courses
  if (title || specialization || learningMode || grade) {
    courses = await Course.findAll({
      where: {
        [Op.and]: [
          title && { title: title },
          specialization && { specialization: specialization },
          learningMode && { learningMode: learningMode },
          grade && { grade: grade },
        ],
      },
    })
  } else {
    courses = await Course.findAll()
  }
  res.status(200).json({
    message: 'All Courses',
    courses: courses.length ? courses : 'No Courses',
  })
}

export const createCourse = async (req, res, next) => {
  const { title, description, specialization, learningMode, grade } = req.body

  const newCourse = await Course.create({
    title,
    description,
    specialization,
    learningMode,
    grade,
  })
  if (!newCourse) {
    return next(new Error('Error While Creating Student'))
  }
  res.json({ message: 'New Student', newCourse })
}
export const updateCourse = async (req, res, next) => {
  const { title, description, specialization, learningMode, grade } = req.body
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

  title && (isCourseExisted.title = title)
  description && (isCourseExisted.description = description)
  specialization && (isCourseExisted.specialization = specialization)
  learningMode && (isCourseExisted.learningMode = learningMode)
  grade && (isCourseExisted.grade = grade)

  const updatedCourse = await isCourseExisted.save()
  if (!updatedCourse) {
    return next(new Error('Error while updating The course'))
  }
  res.status(200).json({ message: 'Updated Course', updatedCourse })
}
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
  const deletedCourse = await Course.destroy({
    where: { id: courseId },
    force: true,
  })
  if (!deletedCourse) {
    return next(new Error('Error While deleting Course'))
  }

  res.status(204).json({ message: 'Deleted Course', deletedCourse })
}
