import { Router } from 'express'
import * as adminStudentControllers from './adminStudent.controllers.js'
import expressAsyncHandler from 'express-async-handler'
const adminStudent = Router({ mergeParams: true })

adminStudent.get(
  '/',
  expressAsyncHandler(adminStudentControllers.getAllStudents)
)
adminStudent.get(
  '/:studentId',
  expressAsyncHandler(adminStudentControllers.getStudent)
)

export default adminStudent
