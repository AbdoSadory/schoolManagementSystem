import { Op } from 'sequelize'
import Course from '../../../../DB/models/course.model.js'
import CourseResults from '../../../../DB/models/courseResults.model.js'
import Student from '../../../../DB/models/student.model.js'

export const getAllCourseResults = async (req, res, next) => {
  const { year, term, oral, practical, midterm, final } = req.query
  let query = {}
  year && (query.year = year)
  term && (query.term = term)
  oral && (query.oral = oral)
  practical && (query.practical = practical)
  midterm && (query.midterm = midterm)
  final && (query.final = final)

  const courseResults = await CourseResults.findAll({
    where: query,
    include: [
      {
        model: Student,
        as: 'tbl_student',
        attributes: [
          'name',
          'email',
          'phoneNumber',
          'parentPhoneNumber',
          'feesStatus',
        ],
      },
      {
        model: Course,
        as: 'tbl_course',
        attributes: ['title', 'grade', 'learningMode'],
      },
    ],
  })
  if (!courseResults)
    return next(new Error('Error While getting Course Results'))

  res.status(200).json({ message: 'Course Results', courseResults })
}
export const getCourseResultById = async (req, res, next) => {
  const { courseResultId } = req.params
  const courseResult = await CourseResults.findByPk(courseResultId)
  if (!courseResult)
    return next(new Error('No Result with this id', { cause: 404 }))

  res.status(200).json({ message: 'Course Result', courseResult })
}
export const getCourseResultByCourseId = async (req, res, next) => {
  const { courseId } = req.params

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No Course with this id', { cause: 400 }))

  const courseResults = await CourseResults.findAll({
    where: {
      tblCourseId: courseId,
    },
  })
  if (!courseResults)
    return next(new Error('Error while getting course results'))

  res.status(200).json({
    message: `Course Results with course id : ${courseId}`,
    courseResults,
  })
}
export const getCourseResultByStudentId = async (req, res, next) => {
  const { studentId } = req.params

  const isStudentExisted = await Student.findByPk(studentId)
  if (!isStudentExisted)
    return next(new Error('No Student with this id', { cause: 404 }))

  const courseResults = await CourseResults.findAll({
    where: {
      tblStudentId: studentId,
    },
  })
  if (!courseResults)
    return next(new Error('Error while getting course results'))

  res.status(200).json({
    message: `Course Results with student id : ${studentId}`,
    courseResults,
  })
}
export const createCourseResult = async (req, res, next) => {
  const { year, term, oral, practical, midterm, final, studentId, courseId } =
    req.body
  const totalResult = oral + practical + midterm + final
  if (totalResult !== 100)
    return next(
      new Error(
        'The summation of oral, practical, midterm, final must be equal 100',
        { cause: 400 }
      )
    )

  const isCourseResultExisted = await CourseResults.findOne({
    where: {
      tblStudentId: studentId,
      tblCourseId: courseId,
    },
  })
  if (isCourseResultExisted) {
    return next(
      new Error('Student had got the result of this course before', {
        cause: 400,
      })
    )
  }
  const isStudentExisted = await Student.findByPk(studentId)
  if (!isStudentExisted)
    return next(new Error('no student with this id', { cause: 404 }))

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('no course with this id', { cause: 404 }))

  const newCourseResult = await CourseResults.create(
    {
      year,
      term,
      oral,
      practical,
      midterm,
      final,
      tblStudentId: studentId,
      tblCourseId: courseId,
    },
    {
      include: { model: Student, model: Course },
    }
  )
  if (!newCourseResult) {
    return next(new Error('Error while adding course result'))
  }
  res.status(201).json({ message: 'new course result', newCourseResult })
}
export const updateCourseResult = async (req, res, next) => {
  /**
   * check the course is existed
   * check if the student is existed
   * check if the student has result with old course id or the new
   * check if the course is existed
   * check if the course has result with old student id or the new
   * check totalResult if not equal 100
   * Update
   */
  const { courseResultId } = req.params
  const { year, term, oral, practical, midterm, final, studentId, courseId } =
    req.body

  const isCourseResultExisted = await CourseResults.findByPk(courseResultId)
  if (!isCourseResultExisted)
    return next(new Error('No Course Result with this id', { cause: 404 }))

  if (studentId) {
    const isStudentExisted = await Student.findByPk(studentId)
    if (!isStudentExisted)
      return next(new Error('No Student with this id', { cause: 404 }))

    // check if course result is existed with new student id and new course id or old one
    const isCourseResultExistedWithStudentId = await CourseResults.findOne({
      where: {
        id: { [Op.ne]: isCourseResultExisted.id },
        tblStudentId: studentId,
        tblCourseId: courseId || isCourseResultExisted.tblCourseId,
      },
    })

    if (isCourseResultExistedWithStudentId)
      return next(
        new Error(
          'This student already had got a course result with the new course id or the course with id which you sent',
          { cause: 400 }
        )
      )
    isCourseResultExisted.tblStudentId = studentId
  }

  if (courseId) {
    const isCourseExisted = await Course.findByPk(courseId)
    if (!isCourseExisted)
      return next(new Error('No Course with this id', { cause: 404 }))

    // check if course result is existed with new course id and new student id or old one
    const isCourseResultExistedWithCourseId = await CourseResults.findOne({
      where: {
        id: { [Op.ne]: isCourseResultExisted.id },
        tblStudentId: studentId || isCourseResultExisted.tblStudentId,
        tblCourseId: courseId,
      },
    })

    if (isCourseResultExistedWithCourseId)
      return next(
        new Error(
          'This course already had got a course result with the new student id',
          { cause: 400 }
        )
      )
    isCourseResultExisted.tblCourseId = courseId
  }

  year && (isCourseResultExisted.year = year)
  term && (isCourseResultExisted.term = term)
  oral && (isCourseResultExisted.oral = oral)
  practical && (isCourseResultExisted.practical = practical)
  midterm && (isCourseResultExisted.midterm = midterm)
  final && (isCourseResultExisted.final = final)

  const totalResult =
    +isCourseResultExisted.oral +
    +isCourseResultExisted.practical +
    +isCourseResultExisted.midterm +
    +isCourseResultExisted.final

  if (totalResult !== 100)
    return next(
      new Error(
        'The summation of oral, practical, midterm, final must be equal 100',
        { cause: 400 }
      )
    )

  const updatedCourseResult = await isCourseResultExisted.save()
  if (!updatedCourseResult)
    return next(new Error('Error While updating course result'))

  res
    .status(200)
    .json({ message: 'Updated Course Result', updatedCourseResult })
}
export const deleteCourseResult = async (req, res, next) => {
  const { courseResultId } = req.params

  const isCourseResultExisted = await CourseResults.findByPk(courseResultId)
  if (!isCourseResultExisted)
    return next(new Error('No Course Result with this id', { cause: 404 }))

  const deletedCourseResult = await isCourseResultExisted.destroy()
  if (!deletedCourseResult)
    return next(new Error('Error While deletion of Course Result'))

  res.status(200).json({
    message: `Done Deleting Course Result with id:${courseResultId}`,
    deletedCourseResult,
  })
}
