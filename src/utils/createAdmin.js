import Admin from '../../DB/models/admin.model.js'
import bcrypt from 'bcryptjs'
import Student from '../../DB/models/student.model.js'
import Employee from '../../DB/models/employee.mode.js'
import Course from '../../DB/models/course.model.js'
import ClassRoom from '../../DB/models/classRoom.model.js'
export const createAdmin = async () => {
  const hashedPassword = bcrypt.hashSync('123456789', +process.env.SALT)
  await Admin.bulkCreate([
    {
      name: 'admin1',
      email: 'admin1@admin.com',
      password: hashedPassword,
    },
    {
      name: 'admin2',
      email: 'admin2@admin.com',
      password: hashedPassword,
    },
  ])

  await Student.bulkCreate([
    {
      name: 'student1',
      email: 'student1@student.com',
      password: hashedPassword,
      phoneNumber: '0100000001',
      parentPhoneNumber: '01004444446',
      totalFees: 2500,
      paidFees: 1000,
      feesStatus: 'notPaid',
      nationality: 'egyptian',
      age: 8,
      gender: 'female',
      grade: '2',
    },
    {
      name: 'student2',
      email: 'student2@student.com',
      password: hashedPassword,
      phoneNumber: '0100000002',
      parentPhoneNumber: '01004444446',
      totalFees: 2500,
      paidFees: 1000,
      feesStatus: 'notPaid',
      nationality: 'egyptian',
      age: 9,
      gender: 'male',
      grade: '3',
    },
  ])

  await Employee.bulkCreate([
    {
      name: 'Abdoooooo',
      email: 'abdo@yahoo.com',
      password: hashedPassword,
      nationalID: '00000000000000',
      nationality: 'egyptian',
      phoneNumber: '01004444440',
      age: 45,
      gender: 'male',
      maritalStatus: 'married',
      graduationYear: '1990',
      educationDegree: 'bachelor',
      employeeType: 'ceo',
      salary: 2359,
    },
    {
      name: 'moooo ali moooo',
      email: 'mo@yahoo.com',
      password: hashedPassword,
      nationalID: '00000000000001',
      nationality: 'egyptian',
      phoneNumber: '01004444441',
      age: 45,
      gender: 'male',
      maritalStatus: 'married',
      graduationYear: '1990',
      educationDegree: 'bachelor',
      employeePosition: 'senior',
      employeeType: 'teacher',
      specialization: 'art',
      salary: 2359,
    },
    {
      name: 'ali Bro ali',
      email: 'ali@yahoo.com',
      password: hashedPassword,
      nationalID: '00000000000002',
      nationality: 'egyptian',
      phoneNumber: '01004444442',
      age: 45,
      gender: 'male',
      maritalStatus: 'married',
      graduationYear: '1990',
      educationDegree: 'bachelor',
      employeePosition: 'senior',
      employeeType: 'teacher',
      specialization: 'science',
      salary: 2359,
    },
  ])

  await Course.bulkCreate([
    {
      title: 'physics',
      specialization: 'science',
      learningMode: 'offline',
      grade: '3',
    },
    {
      title: 'art',
      specialization: 'art',
      learningMode: 'online',
      grade: '2',
    },
  ]).then((res) => {
    return ClassRoom.bulkCreate([
      {
        term: 'first',
        grade: '3',
        year: '2024',
        learningMode: 'offline',
        tblCourseId: 1,
      },
      {
        term: 'first',
        grade: '2',
        year: '2024',
        learningMode: 'online',
        tblCourseId: 2,
      },
    ])
  })
}
