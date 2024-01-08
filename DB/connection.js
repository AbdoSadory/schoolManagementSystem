import { Sequelize } from 'sequelize'

export const sql_config = new Sequelize(
  'schoolmanagementsystemdb',
  'root',
  '123456',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
)

export const connectDB = async () => {
  await sql_config
    .sync({ alter: true })
    .then((res) => {
      console.log('🟢 DB is connected')
    })
    .catch((err) => console.log('🔴', err))
}
