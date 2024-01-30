import Admin from '../../DB/models/admin.model.js'
import bcrypt from 'bcryptjs'
export const createAdmin = async () => {
  const hashedPassword = bcrypt.hashSync('123456789', +process.env.SALT)
  await Admin.create({
    name: 'admin1',
    email: 'admin1@admin.com',
    password: hashedPassword,
  })
}
