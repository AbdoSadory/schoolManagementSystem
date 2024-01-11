import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './DB/connection.js'
import allAssociations from './DB/models/association/associations.js'

config()
const app = express()

connectDB()
// .then((res) => allAssociations())
// .then((res) => createAdmin())
// .then((res) => console.log('🟢 Admin has been created'))
// .catch((err) => console.log(err.message))

app.use(express.json())

app.use('*', (req, res, next) => {
  return res.status(404).json({ message: 'Invalid URL' })
})

app.listen(process.env.PORT, () => {
  console.log(`🟢 Server is running on ${process.env.PORT} 🔥`)
})
