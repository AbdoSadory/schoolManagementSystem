import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()
export const sql_config = new Sequelize(
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  {
    host: process.env.DB_host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    port: parseInt(process.env.DB_port),
  }
)
// export const sql_config = new Sequelize(
//   'schoolmanagementsystemdb',
//   'root',
//   '123456',
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//   }
// )

export const connectDB = async () => {
  await sql_config
    .sync({ alter: true })
    .then((res) => {
      console.log('🟢 DB is connected')
    })
    .catch((err) => console.log('🔴', err.message))
}
