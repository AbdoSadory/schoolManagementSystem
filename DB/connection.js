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
// dpg-cop3vi0l5elc739cb8vg-a
// postgres://schoolmanagementsystemdb_user:1YhQYutIkrNCAdZFijGuIfMaL1o8tyG2@dpg-cop3vi0l5elc739cb8vg-a.oregon-postgres.render.com/schoolmanagementsystemdb
export const connectDB = async () => {
  await sql_config
    .sync({ alter: true })
    .then((res) => {
      console.log('🟢 DB is connected')
    })
    .catch((err) => console.log('🔴', err.message))
}
