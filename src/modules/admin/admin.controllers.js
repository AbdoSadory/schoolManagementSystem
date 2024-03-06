import Admin from '../../../DB/models/admin.model.js'
import bcryptjs from 'bcryptjs'
import generateToken from '../../utils/generateTokenHandler.js'
export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Admin.findOne({
    where: {
      email,
    },
    raw: true,
  })
  if (!user) return next(new Error('Invalid Credentials', { cause: 404 }))
  const isPasswordMatched = bcryptjs.compareSync(password, user.password)
  if (!isPasswordMatched)
    return next(new Error('Invalid Credentials', { cause: 404 }))
  const token = generateToken({ email: user.email })
  user.token = token
  res.status(200).json({ message: 'Admin', user })
}
export const signUp = async (req, res, next) => {
  const { isUserAuthorized } = req
  if (!isUserAuthorized)
    return next(new Error('This user is not Authorized', { cause: 403 }))

  const { name, email, password } = req.body

  const isUserExisted = await Admin.findOne({ where: { email } })
  if (isUserExisted)
    return next(new Error('This Email is already existed', { cause: 409 }))
  const hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  })
  if (!newAdmin)
    return next(new Error('Error while creating Admin, Please try again'))

  res.status(201).json({ message: 'New Admin has been created', newAdmin })
}
