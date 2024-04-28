import { Op } from 'sequelize'
import cloudinaryConnection from '../../utils/mediaHostConnection.js'
import ClassRoom from '../../../DB/models/classRoom.model.js'
import Employee from '../../../DB/models/employee.mode.js'
import Finance from '../../../DB/models/finance.model.js'
import Student from '../../../DB/models/student.model.js'
import Course from '../../../DB/models/course.model.js'
import CourseResults from '../../../DB/models/courseResults.model.js'

export const myProfile = async (req, res, next) => {
  const { id } = req.authenticatedUser
  const user = await Employee.findByPk(id)
  res.status(200).json({ message: 'User Profile', user })
}
export const updateProfile = async (req, res, next) => {
  /*
  1- check the employee if existed
  2- check new email if existed
  3- check nationaID 
  3- check phone number
  4- hash password
  5- update
  */
  const {
    name,
    email,
    password,
    nationalID,
    nationality,
    phoneNumber,
    age,
    gender,
    maritalStatus,
    graduationYear,
    educationDegree,
    employeePosition,
    specialization,
    employeeType,
    salary,
  } = req.body

  const { id } = req.authenticatedUser

  const isEmployeeExisted = await Employee.findByPk(id)
  if (!isEmployeeExisted) {
    return next(
      new Error('This Employee is not existed', {
        cause: 404,
      })
    )
  }

  if (email) {
    const isEmailExistedByEmployee = await Employee.findOne({
      where: { id: { [Op.ne]: id }, email },
    })
    const isEmailExistedForStudent = await Student.findOne({
      where: { email },
    })
    if (isEmailExistedByEmployee || isEmailExistedForStudent) {
      return next(
        new Error(
          'This Email is already existed for employee or student, try another one',
          {
            cause: 409,
          }
        )
      )
    }
    isEmployeeExisted.email = email
  }
  if (nationalID) {
    const isNationalExisted = await Employee.findOne({
      where: { id: { [Op.ne]: id }, nationalID },
    })
    if (isNationalExisted) {
      return next(
        new Error('This National ID is already existed, try another one', {
          cause: 409,
        })
      )
    }
    isEmployeeExisted.nationalID = nationalID
  }
  if (phoneNumber) {
    const isPhoneNumberExistedForEmployee = await Employee.findOne({
      where: { id: { [Op.ne]: id }, phoneNumber },
    })
    const isPhoneNumberExistedForStudent = await Student.findOne({
      where: { phoneNumber },
    })
    if (isPhoneNumberExistedForEmployee || isPhoneNumberExistedForStudent) {
      return next(
        new Error(
          'This Phone Number is already existed for employee or student, try another one',
          {
            cause: 409,
          }
        )
      )
    }

    isEmployeeExisted.phoneNumber = phoneNumber
  }

  let uploadedProfileImage
  if (req.file) {
    uploadedProfileImage = await cloudinaryConnection().uploader.upload(
      req.file.path,
      {
        folder: `schoolManagementSystem/assets/employee/${isEmployeeExisted.employeeType}/${isEmployeeExisted.id}/imgs`,
        public_id: 'profileImage',
      }
    )

    isEmployeeExisted.profileImagePath = uploadedProfileImage.secure_url
    isEmployeeExisted.profileImagePublic_Id = uploadedProfileImage.public_id
  }
  let hashedPassword
  if (password) {
    hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  }

  name && (isEmployeeExisted.name = name)
  password && (isEmployeeExisted.password = hashedPassword)
  nationality && (isEmployeeExisted.nationality = nationality)
  age && (isEmployeeExisted.age = age)
  gender && (isEmployeeExisted.gender = gender)
  maritalStatus && (isEmployeeExisted.maritalStatus = maritalStatus)
  graduationYear && (isEmployeeExisted.graduationYear = graduationYear)
  educationDegree && (isEmployeeExisted.educationDegree = educationDegree)
  employeePosition && (isEmployeeExisted.employeePosition = employeePosition)
  specialization && (isEmployeeExisted.specialization = specialization)
  employeeType && (isEmployeeExisted.employeeType = employeeType)
  salary && (isEmployeeExisted.salary = salary)

  const updatedEmployee = await isEmployeeExisted.save()
  if (!updatedEmployee) {
    return next(new Error('Error while updating The Employee'))
  }
  res
    .status(200)
    .json({ message: 'Profile has been updated successfully', updatedEmployee })
}
export const employeeProfile = async (req, res, next) => {
  const { employeeId } = req.params
  const user = await Employee.findByPk(employeeId)
  res.status(200).json({ message: 'User Profile', user })
}
export const allFinance = async (req, res, next) => {
  const { employeeType } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )
  const { year } = req.query
  let query = {}
  year && (query.year = year)
  const finance = await Finance.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All Finance',
    finance: finance.length ? finance : 'No finance data yet',
  })
}

export const allClassrooms = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }

  const { term, year, grade, learningMode } = req.query
  let query = {}
  term && (query.term = term)
  grade && (query.grade = grade)
  year && (query.year = year)
  learningMode && (query.learningMode = learningMode)
  const classrooms = await ClassRoom.findAll(
    { where: query },
    { include: Course }
  )
  if (!classrooms) return next(new Error('Error while getting classrooms'))

  res.status(200).json({ message: 'Classrooms', classrooms })
}

export const getClassroomUsingId = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
  const { classroomId } = req.params

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted)
    return next(new Error('No Classroom with this id', { cause: 404 }))

  res.status(200).json({ message: 'Classroom', classroom: isClassroomExisted })
}

export const createClassroom = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }

  const { term, grade, year, learningMode, courseId } = req.body

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No Course with this id', { cause: 404 }))

  // check if the course grade level doesn't equal the classroom grade
  if (isCourseExisted.grade !== grade) {
    return next(
      new Error(
        'Course grade is not the same level with your entered classroom grade',
        { cause: 409 }
      )
    )
  }
  // check if the course learningMode level doesn't equal the classroom learningMode
  if (isCourseExisted.learningMode !== learningMode) {
    return next(
      new Error(
        'Course learningMode is not the same like your entered classroom learningMode',
        { cause: 409 }
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

export const updateClassroom = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }

  const { classroomId } = req.params
  const { term, grade, year, learningMode, courseId } = req.body

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted)
    return next(new Error('No Classroom with this id', { cause: 404 }))

  term && (isClassroomExisted.term = term)
  grade && (isClassroomExisted.grade = grade)
  year && (isClassroomExisted.year = year)
  learningMode && (isClassroomExisted.learningMode = learningMode)

  if (courseId) {
    const isCourseExisted = await Course.findByPk(courseId)
    if (!isCourseExisted)
      return next(new Error('No Course with this id', { cause: 404 }))
    // check if the course grade level doesn't equal the classroom grade
    if (isCourseExisted.grade !== isClassroomExisted.grade) {
      return next(
        new Error(
          'Course grade is not the same grade level of entered classroom grade',
          { cause: 409 }
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
          'Course learningMode is not the same like your entered or old classroom learningMode',
          { cause: 409 }
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
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }

  const { classroomId } = req.params

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: Course,
  })
  if (!isClassroomExisted)
    return next(new Error('No Classroom with this id', { cause: 404 }))

  await isClassroomExisted.destroy()

  res.status(200).json({ message: 'Classroom has been deleted successfully' })
}

export const allCourses = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
  const { courseId } = req.params

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('No Course with this id', { cause: 404 }))

  res.status(200).json({ message: 'Course', course: isCourseExisted })
}

export const createCourse = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

export const updateCourse = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

export const deleteCourse = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

export const changeCourseState = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['senior', 'team-leader', 'manager']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

export const getAllCourseResults = async (req, res, next) => {
  const { employeeType } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

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
export const createCourseResult = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['junior', 'mid-level']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )
  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
  const { year, term, oral, practical, midterm, final, studentId, courseId } =
    req.body

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

  const totalResult = oral + practical + midterm + final
  if (totalResult !== 100)
    return next(
      new Error(
        'The summation of oral, practical, midterm, final must be equal 100',
        { cause: 400 }
      )
    )

  const isStudentExisted = await Student.findByPk(studentId)
  if (!isStudentExisted)
    return next(new Error('no student with this id', { cause: 404 }))

  const isCourseExisted = await Course.findByPk(courseId)
  if (!isCourseExisted)
    return next(new Error('no course with this id', { cause: 404 }))

  if (!isCourseExisted.isActive)
    return next(
      new Error("can't add result for inactive course", {
        cause: 409,
      })
    )

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
export const getCourseResultById = async (req, res, next) => {
  const { employeeType } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  const { courseResultId } = req.params
  const courseResult = await CourseResults.findByPk(courseResultId)
  if (!courseResult)
    return next(new Error('No Result with this id', { cause: 404 }))

  res.status(200).json({ message: 'Course Result', courseResult })
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
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['junior', 'mid-level']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )
  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

    if (!isCourseExisted.isActive)
      return next(
        new Error("can't add result for inactive course", {
          cause: 409,
        })
      )

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
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['junior', 'mid-level']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )
  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
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

export const restoreCourseResult = async (req, res, next) => {
  const { employeeType, employeePosition } = req.authenticatedUser
  const authorizedEmployeeTypes = ['teacher']
  const authorizedTeacherTypes = ['junior', 'mid-level']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )
  if (employeeType === 'teacher') {
    if (!authorizedTeacherTypes.includes(employeePosition))
      return next(
        new Error(
          `You can't access this resource with your position: ${employeePosition}`,
          {
            cause: 403,
          }
        )
      )
  }
  const { courseResultId } = req.params
  const isCourseResultExisted = await CourseResults.findByPk(courseResultId, {
    paranoid: false,
  })
  if (!isCourseResultExisted)
    return next(new Error('No Course-Result with this id', { cause: 404 }))

  const restoredCourseResult = await isCourseResultExisted.restore()

  if (!restoredCourseResult)
    return next(new Error('Error while restoring course-result'))

  res.status(200).json({
    message: 'Course-Result has been restored successfully',
    restoredCourseResult,
  })
}

export const getAllStudents = async (req, res, next) => {
  const { employeeType } = req.authenticatedUser
  const authorizedEmployeeTypes = ['owner', 'ceo', 'director', 'teacher']
  if (!authorizedEmployeeTypes.includes(employeeType))
    return next(
      new Error(
        `You can't access this resource with your position: ${employeeType}`,
        {
          cause: 403,
        }
      )
    )

  const { name, email } = req.query
  const query = {}
  name && (query.name = name)
  email && (query.email = email)

  const students = await Student.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All Students',
    students,
  })
}
