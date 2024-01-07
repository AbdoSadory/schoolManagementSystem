import express from 'express'
import { config } from 'dotenv'
config()
const app = express()

app.use(express.json())

app.use('*', (req, res, next) => {
  return res.status(404).json({ message: 'Invalid URL' })
})

app.listen(process.env.PORT, () => {
  console.log(`🟢 Server is running on ${process.env.PORT} 🔥`)
})
