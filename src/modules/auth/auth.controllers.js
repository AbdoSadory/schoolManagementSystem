import Employee from '../../../DB/models/employee.mode.js'
import Student from '../../../DB/models/student.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
/**
 *
 * @param {email,password}
 * @query {model}
 * check model if it's Student or Employee
 * check email if it's existed
 * check password if it's right
 * @return token
 */
export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  const { model } = req.query

  // check model if it's Student or Employee
  let entity
  if (model === 'Student') entity = Student
  else if (model === 'Employee') entity = Employee

  //check email if it's existed
  const isUserExisted = await entity.findOne({ where: { email } })
  if (!isUserExisted)
    return next(new Error('Invalid credentials', { cause: 400 }))

  // check password if it's right

  const isPasswordCorrect = await bcryptjs.compare(
    password,
    isUserExisted.password
  )
  if (!isPasswordCorrect)
    return next(new Error('Invalid credentials', { cause: 400 }))

  const token = jwt.sign(
    { email: isUserExisted.email },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  )
  if (!token) return next(new Error('Error while generating token'))

  res
    .status(200)
    .json({ message: 'User has been logged In successfully', token })
}
