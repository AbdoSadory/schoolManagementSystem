import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './DB/connection.js'
import adminRouter from './src/modules/admin/admin.routes.js'
import globalErrorHandler from './src/middlewares/globalErrorHandler.js'

config()
const app = express()

// connectDB()
// .then((res) => allAssociations())
// .then((res) => createAdmin())
// .then((res) => console.log('🟢 Admin has been created'))
// .catch((err) => console.log(err.message))

app.use(express.json())

app.use('/admin', adminRouter)

app.use('*', (req, res, next) => {
  return next(new Error('Invalid URL', { cause: 404 }))
})

app.use(globalErrorHandler)
app.listen(process.env.PORT, () => {
  console.log(`🟢 Server is running on ${process.env.PORT} 🔥`)
})
