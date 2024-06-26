import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './DB/connection.js'
import adminRouter from './src/modules/admin/admin.routes.js'
import authRouter from './src/modules/auth/auth.routes.js'
import employeeRouter from './src/modules/employee/employee.routes.js'
import globalErrorHandler from './src/middlewares/globalErrorHandler.js'
import cloudinaryConnection from './src/utils/mediaHostConnection.js'
import allAssociations from './DB/models/associations/associations.js'
import studentRouter from './src/modules/student/student.routes.js'
import cors from 'cors'

config()
const app = express()

connectDB().then((res) => allAssociations())
cloudinaryConnection()

app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/employee', employeeRouter)
app.use('/student', studentRouter)

app.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'welcome to our school' })
})
app.use('*', (req, res, next) => {
  return next(new Error('Invalid URL', { cause: 404 }))
})

app.use(globalErrorHandler)
app.listen(process.env.PORT, () => {
  console.log(`🟢 Server is running on ${process.env.PORT} 🔥`)
})
