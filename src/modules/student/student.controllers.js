import { Op } from 'sequelize'
import cloudinaryConnection from '../../utils/mediaHostConnection.js'
import ClassRoom from '../../../DB/models/classRoom.model.js'
import Employee from '../../../DB/models/employee.mode.js'
import Finance from '../../../DB/models/finance.model.js'
import Student from '../../../DB/models/student.model.js'
import Course from '../../../DB/models/course.model.js'
import CourseResults from '../../../DB/models/courseResults.model.js'
import TeachersCourses from '../../../DB/models/junctionTables/teacherCourse.model.js'
import TeachersClassRooms from '../../../DB/models/junctionTables/teachersClassRooms.model.js'
import StudentsCourses from '../../../DB/models/junctionTables/studentCourse.model.js'
import StudentsClassRooms from '../../../DB/models/junctionTables/studentClassRooms.model.js'

export const myProfile = async (req, res, next) => {
  const { id } = req.authenticatedUser
  const user = await Student.findByPk(id)
  res.status(200).json({ message: 'Student Profile', user })
}
export const updateProfile = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    parentPhoneNumber,
    nationality,
    gender,
  } = req.body

  const { id } = req.authenticatedUser

  const isStudentExisted = await Student.findByPk(id)
  if (!isStudentExisted) {
    return next(
      new Error('This Student is not existed', {
        cause: 404,
      })
    )
  }

  if (email) {
    const isEmailExistedByAnotherStudent = await Student.findOne({
      where: { id: { [Op.ne]: id }, email },
    })
    const isEmailExistedByEmployee = await Employee.findOne({
      where: { email },
    })
    if (isEmailExistedByEmployee || isEmailExistedByAnotherStudent) {
      return next(
        new Error(
          'This Email is already existed for employee or student, try another one',
          {
            cause: 409,
          }
        )
      )
    }
    isStudentExisted.email = email
  }

  if (phoneNumber) {
    const isPhoneNumberExistedByAnotherStudent = await Student.findOne({
      where: { id: { [Op.ne]: id }, phoneNumber },
    })
    const isPhoneNumberExistedByParent = await Student.findOne({
      where: { id: { [Op.ne]: id }, parentPhoneNumber: phoneNumber },
    })
    const isPhoneNumberExistedByEmployee = await Employee.findOne({
      where: { phoneNumber },
    })
    if (
      isPhoneNumberExistedByEmployee ||
      isPhoneNumberExistedByParent ||
      isPhoneNumberExistedByAnotherStudent
    ) {
      return next(
        new Error(
          'This Phone Number is already existed for employee or student or parent, try another one',
          {
            cause: 409,
          }
        )
      )
    }

    isStudentExisted.phoneNumber = phoneNumber
  }

  if (parentPhoneNumber) {
    const isPhoneNumberExistedForStudent = await Student.findOne({
      where: { phoneNumber: parentPhoneNumber },
    })
    if (isPhoneNumberExistedForStudent) {
      return next(
        new Error(
          'This Phone Number is already existed for student phone number, try another one',
          {
            cause: 400,
          }
        )
      )
    }
  }
  let uploadedProfileImage
  if (req.file) {
    uploadedProfileImage = await cloudinaryConnection().uploader.upload(
      req.file.path,
      {
        folder: `schoolManagementSystem/assets/students/grade-${isStudentExisted.grade}/${isStudentExisted.id}/imgs`,
        public_id: 'profileImage',
      }
    )

    isStudentExisted.profileImagePath = uploadedProfileImage.secure_url
    isStudentExisted.profileImagePublic_Id = uploadedProfileImage.public_id
  }
  let hashedPassword
  if (password) {
    hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
    isStudentExisted.password = hashedPassword
  }

  name && (isStudentExisted.name = name)
  nationality && (isStudentExisted.nationality = nationality)
  gender && (isStudentExisted.gender = gender)

  const updatedStudent = await isStudentExisted.save()
  if (!updatedStudent) {
    return next(new Error('Error while updating The student'))
  }
  res.status(200).json({ message: 'Updated Student', updatedStudent })
}
export const getAllCourseResults = async (req, res, next) => {
  const { id, role } = req.authenticatedUser

  if (!role === 'student')
    return next(
      new Error(`You can't access this resource with your role: ${role}`, {
        cause: 403,
      })
    )

  const { year, term, oral, practical, midterm, final } = req.query
  let query = { tblStudentId: id }
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
        model: Course,
        attributes: ['title', 'grade', 'learningMode'],
      },
    ],
  })
  if (!courseResults)
    return next(new Error('Error While getting Course Results'))

  res.status(200).json({ message: 'Course Results', courseResults })
}

export const getAllStudentCourses = async (req, res, next) => {
  const { id, role } = req.authenticatedUser
  if (!role === 'student')
    return next(
      new Error(`You can't access this resource with your role: ${role}`, {
        cause: 403,
      })
    )

  const { courseId } = req.query

  let query = { tblStudentId: id }
  courseId && (query.tblCourseId = courseId)
  const studentsCourses = await StudentsCourses.findAll({
    where: query,
    include: [
      {
        model: Course,
        attributes: ['title', 'grade', 'learningMode'],
      },
    ],
  })

  res.status(200).json({
    message: 'Student Courses',
    studentsCourses,
  })
}

export const getAllStudentsClassrooms = async (req, res, next) => {
  const { id, role } = req.authenticatedUser
  if (!role === 'student')
    return next(
      new Error(`You can't access this resource with your role: ${role}`, {
        cause: 403,
      })
    )

  const { classroomId } = req.query
  let query = { tblStudentId: id }
  classroomId && (query.tblClassRoomId = classroomId)
  const studentsClassrooms = await StudentsClassRooms.findAll({
    where: query,
    include: [
      {
        model: ClassRoom,
        attributes: ['term', 'grade', 'year', 'learningMode'],
      },
    ],
  })

  res.status(200).json({
    message: 'Student Classrooms',
    studentsClassrooms,
  })
}
