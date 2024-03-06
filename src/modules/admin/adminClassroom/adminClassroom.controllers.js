import ClassRoom from '../../../../DB/models/classRoom.model.js'
import Course from '../../../../DB/models/course.model.js'

export const getAllClassrooms = async (req, res, next) => {
  const { term, year, grade, learningMode } = req.query
  let query = {}
  if (term) query.term = term
  if (grade) query.grade = grade
  if (year) query.year = year
  if (learningMode) query.learningMode = learningMode
  const classrooms = await ClassRoom.findAll(
    { where: query },
    { include: Course }
  )
  if (!classrooms) return next(new Error('Error while getting classrooms'))

  res.status(200).json({ message: 'Classrooms', classrooms })
}
export const getClassroomUsingId = async (req, res, next) => {
  const { classroomId } = req.params

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted) return next(new Error('No Classroom with this id'))

  res.status(200).json({ message: 'Classroom', classroom: isClassroomExisted })
}
export const getClassroomUsingCourseId = async (req, res, next) => {
  const { courseId } = req.params

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted) return next(new Error('No Course with this id'))

  const classrooms = await ClassRoom.findAll({
    where: {
      tblCourseId: courseId,
    },
  })
  if (!classrooms) return next(new Error('Error while retrieving classrooms'))
  res.status(200).json({
    message: `Classrooms of course id ${courseId}`,
    course: isCourseExisted,
    classrooms,
  })
}
export const createClassroom = async (req, res, next) => {
  const { term, grade, year, learningMode, courseId } = req.body

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted) return next(new Error('No Course with this id'))

  // check if the course grade level doesn't equal the classroom grade
  if (isCourseExisted.grade !== grade) {
    return next(
      new Error(
        'Course grade is not the same level with your entered classroom grade'
      )
    )
  }
  // check if the course learningMode level doesn't equal the classroom learningMode
  if (isCourseExisted.learningMode !== learningMode) {
    return next(
      new Error(
        'Course learningMode is not the same like your entered classroom learningMode'
      )
    )
  }

  // check if the course is active
  if (!isCourseExisted.isActive) {
    return next(
      new Error(
        "Course is not active, you can't add classroom to inactive course"
      ),
      { cause: 409 }
    )
  }
  const newClassroom = await ClassRoom.create(
    {
      term,
      grade,
      year,
      learningMode,
      tblCourseId: isCourseExisted.id,
    },
    {
      include: { model: Course },
    }
  )
  if (!newClassroom) return next(new Error('Error While creating classroom'))
  res.status(201).json({ message: 'New Classroom', classroom: newClassroom })
}
// ========================== change classroom State ===================//
export const changeClassroomState = async (req, res, next) => {
  const { isActive } = req.body
  const { classroomId } = req.params

  const isClassroomExisted = await ClassRoom.findOne({
    where: { id: classroomId },
  })
  if (!isClassroomExisted) {
    return next(
      new Error('This classroom is not existed', {
        cause: 404,
      })
    )
  }

  isClassroomExisted.isActive = isActive

  const updatedClassroom = await isClassroomExisted.save()
  if (!updatedClassroom) {
    return next(new Error('Error while changing The classroom state'))
  }
  res.status(200).json({ message: 'Change Classroom State', updatedClassroom })
}

export const updateClassroom = async (req, res, next) => {
  const { classroomId } = req.params
  const { term, grade, year, learningMode, courseId } = req.body

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted) return next(new Error('No Classroom with this id'))

  term && (isClassroomExisted.term = term)
  grade && (isClassroomExisted.grade = grade)
  year && (isClassroomExisted.year = year)
  learningMode && (isClassroomExisted.learningMode = learningMode)

  if (courseId) {
    const isCourseExisted = await Course.findByPk(courseId)
    if (!isCourseExisted) return next(new Error('No Course with this id'))
    // check if the course grade level doesn't equal the classroom grade
    if (isCourseExisted.grade !== isClassroomExisted.grade) {
      return next(
        new Error(
          'Course grade is not the same grade level of entered classroom grade'
        )
      )
    }
    // check if the course learningMode level doesn't equal the classroom learningMode
    if (
      isCourseExisted.learningMode !== learningMode ||
      isCourseExisted.learningMode !== isClassroomExisted.learningMode
    ) {
      return next(
        new Error(
          'Course learningMode is not the same like your entered or old classroom learningMode'
        )
      )
    }

    // check if the course is active
    if (!isCourseExisted.isActive) {
      return next(
        new Error(
          "Course is not active, you can't add classroom to inactive course"
        ),
        { cause: 409 }
      )
    }
    isClassroomExisted.tblCourseId = courseId
  }

  await isClassroomExisted.save()

  res
    .status(200)
    .json({ message: 'Updated Classroom', classroom: isClassroomExisted })
}
export const deleteClassroom = async (req, res, next) => {
  const { classroomId } = req.params

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted) return next(new Error('No Classroom with this id'))

  await isClassroomExisted.destroy()

  res.status(200).json({ message: 'Classroom has been deleted successfully' })
}

export const restoreClassroom = async (req, res, next) => {
  const { classroomId } = req.params
  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    paranoid: false,
  })
  if (!isClassroomExisted) return next(new Error('No Classroom with this id'))

  const restoredClassroom = await isClassroomExisted.restore()

  if (!restoredClassroom)
    return next(new Error('error while restoring classroom'))
  res.status(200).json({
    message: 'Classroom has been restored successfully',
    restoredClassroom,
  })
}
