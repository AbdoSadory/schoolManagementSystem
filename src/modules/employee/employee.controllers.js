import ClassRoom from '../../../DB/models/classRoom.model.js'
import Employee from '../../../DB/models/employee.mode.js'
import Finance from '../../../DB/models/finance.model.js'
import Student from '../../../DB/models/student.model.js'
import { Op } from 'sequelize'
import cloudinaryConnection from '../../utils/mediaHostConnection.js'

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
