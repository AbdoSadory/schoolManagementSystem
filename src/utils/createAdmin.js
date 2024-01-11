import Admin from '../../DB/models/admin.model.js'

export const createAdmin = async () => {
  await Admin.create({
    name: 'admin1',
    email: 'admin1@admin1.com',
    password: '123456',
  })
}
