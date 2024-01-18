import bcryptjs from 'bcryptjs'
import Employee from '../../../../DB/models/employee.mode.js'
import cloudinaryConnection from '../../../utils/mediaHostConnection.js'

export const getAllEmployees = async (req, res, next) => {
  const { name, email } = req.query
  let employees
  if (name || email) {
    employees = await Employee.findAll({
      where: {
        [Op.and]: [name && { name: name }, email && { email: email }],
      },
    })
  } else {
    employees = await Employee.findAll()
  }
  res.status(200).json({
    message: 'All Employees',
    employees,
  })
}

export const getEmployeeByEmail = async (req, res, next) => {
  const { employeeEmail } = req.body
  const employee = await Employee.findOne({
    where: {
      email: employeeEmail,
    },
  })
  if (!employee) {
    return next(
      new Error('This Employee is not existed', {
        cause: 404,
      })
    )
  }
  res.status(200).json({ message: 'Employee', employee })
}
export const createEmployee = async (req, res, next) => {
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

  const isEmailExisted = await Employee.findOne({ where: { email } })
  if (isEmailExisted) {
    return next(new Error('This Email is already existed', { cause: 400 }))
  }
  const hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  const newEmployee = await Employee.create({
    name,
    email,
    password: hashedPassword,
    nationalID,
    nationality,
    phoneNumber,
    age,
    gender,
    maritalStatus,
    graduationYear,
    educationDegree,
    employeePosition,
    employeeType,
    specialization,
    salary,
  })
  if (!newEmployee) {
    return next(new Error('Error While Creating Employee'))
  }
  res.json({ message: 'New Employee', newEmployee })
}
export const updateEmployee = async (req, res, next) => {
  /*
  1- check the employee if existed
  2- check new email if existed
  3- check nationaID 
  3- check phone number
  4- hash password
  5- update
  */
  const {
    employeeEmail,
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

  if (!employeeEmail) {
    return next(
      new Error('You should send the employee that you want to update him', {
        cause: 400,
      })
    )
  }
  const isEmployeeExisted = await Employee.findOne({
    where: { email: employeeEmail },
  })
  if (!isEmployeeExisted) {
    return next(
      new Error('This Employee is not existed', {
        cause: 404,
      })
    )
  }

  if (email) {
    const isEmailExisted = await Employee.findOne({ where: { email } })
    if (isEmailExisted && isEmailExisted.email !== isEmployeeExisted.email) {
      return next(
        new Error('This Email is already existed, try another one', {
          cause: 400,
        })
      )
    }
  }
  if (nationalID) {
    const isNationalExisted = await Employee.findOne({ where: { nationalID } })
    if (
      isNationalExisted &&
      isNationalExisted.nationalID !== isEmployeeExisted.nationalID
    ) {
      return next(
        new Error('This National ID is already existed, try another one', {
          cause: 400,
        })
      )
    }
  }
  if (phoneNumber) {
    const isPhoneNumberExisted = await Employee.findOne({
      where: { phoneNumber },
    })
    if (
      isPhoneNumberExisted &&
      isPhoneNumberExisted.phoneNumber !== isEmployeeExisted.phoneNumber
    ) {
      return next(
        new Error('This Phone Number is already existed, try another one', {
          cause: 400,
        })
      )
    }
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
  email && (isEmployeeExisted.email = email)
  password && (isEmployeeExisted.password = hashedPassword)
  nationalID && (isEmployeeExisted.nationalID = nationalID)
  nationality && (isEmployeeExisted.nationality = nationality)
  phoneNumber && (isEmployeeExisted.phoneNumber = phoneNumber)
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
    await cloudinaryConnection().uploader.destroy(
      uploadedProfileImage.public_id
    )
    return next(new Error('Error while updating The Employee'))
  }
  res.status(200).json({ message: 'Updated Employee', updatedEmployee })
}

export const deleteEmployee = async (req, res, next) => {
  const { employeeEmail } = req.body
  const isEmployeeExisted = await Employee.findOne({
    where: {
      email: employeeEmail,
    },
  })
  if (!isEmployeeExisted) {
    return next(
      new Error('This Employee is not existed', {
        cause: 404,
      })
    )
  }
  const deletedEmployee = await isEmployeeExisted.destroy({ force: true })

  if (!deletedEmployee) {
    return next(new Error('Error While deleting Employee'))
  }
  await cloudinaryConnection()
    .api.delete_resources_by_prefix(
      `schoolManagementSystem/assets/employee/teacher/${isEmployeeExisted.id}`
    )
    .then((result) =>
      cloudinaryConnection().api.delete_folder(
        `schoolManagementSystem/assets/employee/teacher/${isEmployeeExisted.id}`
      )
    )
    .catch((err) => next(new Error('Error While Deleting Media folders')))
  res.status(204).json({ message: 'Deleted Employee' })
}
