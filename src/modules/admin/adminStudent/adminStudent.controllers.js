import bcryptjs from 'bcryptjs'
import Student from '../../../../DB/models/student.model.js'
import cloudinaryConnection from '../../../utils/mediaHostConnection.js'

export const getAllStudents = async (req, res, next) => {
  const { name, email } = req.query
  let students
  if (name || email) {
    students = await Student.findAll({
      where: { [Op.and]: [name && { name: name }, email && { email: email }] },
    })
  } else {
    students = await Student.findAll()
  }
  res.status(200).json({
    message: 'All Students',
    students,
  })
}
export const getStudentByEmail = async (req, res, next) => {
  const { studentEmail } = req.body
  const student = await Student.findOne({
    where: {
      email: studentEmail,
    },
  })
  if (!student) {
    return next(
      new Error('This student is not existed', {
        cause: 404,
      })
    )
  }
  res.status(200).json({ message: 'Student', student })
}
export const createStudent = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    parentPhoneNumber,
    totalFees,
    paidFees,
    feesStatus,
    nationality,
    age,
    gender,
    grade,
  } = req.body

  const isStudentExisted = await Student.findOne({ where: { email } })
  if (isStudentExisted) {
    return next(new Error('This Email is already existed', { cause: 400 }))
  }
  const hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  const newStudent = await Student.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    parentPhoneNumber,
    totalFees,
    paidFees,
    feesStatus,
    nationality,
    age,
    gender,
    grade,
  })
  if (!newStudent) {
    return next(new Error('Error While Creating Student'))
  }
  res.json({ message: 'New Student', newStudent })
}
export const updateStudent = async (req, res, next) => {
  /*
  1- check the student if existed
  2- check new email if existed
  3- check phone number
  4- hash password
  5- update
  */
  const {
    studentEmail,
    name,
    email,
    password,
    phoneNumber,
    parentPhoneNumber,
    totalFees,
    paidFees,
    feesStatus,
    nationality,
    age,
    gender,
    grade,
  } = req.body

  if (!studentEmail) {
    return next(
      new Error('You should send the student that you want to update him', {
        cause: 400,
      })
    )
  }
  const isStudentExisted = await Student.findOne({
    where: { email: studentEmail },
  })
  if (!isStudentExisted) {
    return next(
      new Error('This student is not existed', {
        cause: 404,
      })
    )
  }

  if (email) {
    const isEmailExisted = await Student.findOne({ where: { email } })
    if (isEmailExisted && isEmailExisted.email !== isStudentExisted.email) {
      return next(
        new Error('This Email is already existed, try another one', {
          cause: 400,
        })
      )
    }
  }

  if (phoneNumber) {
    const isPhoneNumberExisted = await Student.findOne({
      where: { phoneNumber },
    })
    if (
      isPhoneNumberExisted &&
      isPhoneNumberExisted.phoneNumber !== isStudentExisted.phoneNumber
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
  }

  name && (isStudentExisted.name = name)
  email && (isStudentExisted.email = email)
  password && (isStudentExisted.password = hashedPassword)
  nationality && (isStudentExisted.nationality = nationality)
  phoneNumber && (isStudentExisted.phoneNumber = phoneNumber)
  parentPhoneNumber && (isStudentExisted.parentPhoneNumber = parentPhoneNumber)
  age && (isStudentExisted.age = age)
  gender && (isStudentExisted.gender = gender)
  totalFees && (isStudentExisted.totalFees = totalFees)
  paidFees && (isStudentExisted.paidFees = paidFees)
  feesStatus && (isStudentExisted.feesStatus = feesStatus)
  grade && (isStudentExisted.grade = grade)

  const updatedStudent = await isStudentExisted.save()
  if (!updatedStudent) {
    await cloudinaryConnection().uploader.destroy(
      uploadedProfileImage.public_id
    )
    return next(new Error('Error while updating The student'))
  }
  res.status(200).json({ message: 'Updated Student', updatedStudent })
}
export const deleteStudent = async (req, res, next) => {
  const { studentEmail } = req.body
  const isStudentExisted = await Student.findOne({
    where: {
      email: studentEmail,
    },
  })
  if (!isStudentExisted) {
    return next(
      new Error('This Student is not existed', {
        cause: 404,
      })
    )
  }
  const deletedStudent = await Student.destroy({
    where: { email: studentEmail },
    force: true,
  })
  if (!deletedStudent) {
    return next(new Error('Error While deleting Student'))
  }
  await cloudinaryConnection()
    .api.delete_resources_by_prefix(
      `schoolManagementSystem/assets/students/grade-${isStudentExisted.grade}/${isStudentExisted.id}`
    )
    .then((result) =>
      cloudinaryConnection().api.delete_folder(
        `schoolManagementSystem/assets/students/grade-${isStudentExisted.grade}/${isStudentExisted.id}`
      )
    )
    .catch((err) => next(new Error('Error While Deleting Media folders')))
  res.status(204).json({ message: 'Deleted Student', deletedStudent })
}
