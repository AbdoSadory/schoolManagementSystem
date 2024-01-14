import bcryptjs from 'bcryptjs'
import Employee from '../../../../DB/models/employee.mode.js'

export const getAllEmployees = async (req, res, next) => {
  const { name, email } = req.query
  let employees
  if (name || email) {
    employees = await Employee.findAll({
      where: { name: name ? name : '', email: email ? email : '' },
    })
  } else {
    employees = await Employee.findAll()
  }
  res.status(200).json({
    message: 'All Employees',
    employees,
  })
}
export const getEmployee = async (req, res, next) => {
  const { employeeId } = req.params
  console.log(employeeId)
}
export const getEmployeeByEmail = async (req, res, next) => {
  const { email } = req.body
  console.log(email)
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
    employeeType,
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
    employeeType,
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
  let hashedPassword
  if (password) {
    hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  }
  const updatedEmployee = await Employee.update(
    {
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
    },
    { where: { email: employeeEmail } }
  )
  if (!updatedEmployee) {
    return next(new Error('Error While updating Employee'))
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
  const deletedEmployee = await Employee.destroy({
    where: { email: employeeEmail },
    force: true,
  })
  console.log(deletedEmployee)
  if (!deletedEmployee) {
    return next(new Error('Error While deleting Employee'))
  }
  res.status(200).json({ message: 'Deleted Employee', deletedEmployee })
}
