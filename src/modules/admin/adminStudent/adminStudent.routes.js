import { Router } from 'express'
import * as adminStudentControllers from './adminStudent.controllers.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminStudentDataValidationSchemas from './adminStudent.dataValidationSchemas.js'
import fileUploadingHandler from '../../../middlewares/filesUploadingHandler.js'
import allowedExtensions from '../../../utils/allowedExtensions.js'
const adminStudent = Router({ mergeParams: true })

adminStudent.get(
  '/',
  expressAsyncHandler(adminStudentControllers.getAllStudents)
)
adminStudent.get(
  '/getStudentByEmail',
  expressAsyncHandler(adminStudentControllers.getStudentByEmail)
)

adminStudent.post(
  '/createStudent',
  dataValidationHandler(
    adminStudentDataValidationSchemas.adminStudentCreateStudent
  ),
  expressAsyncHandler(adminStudentControllers.createStudent)
)

adminStudent.put(
  '/updateStudent',
  fileUploadingHandler({ extensions: allowedExtensions.image }).single(
    'profileImage'
  ),
  dataValidationHandler(
    adminStudentDataValidationSchemas.adminStudentUpdateStudent
  ),
  expressAsyncHandler(adminStudentControllers.updateStudent)
)

adminStudent.delete(
  '/deleteStudent',
  dataValidationHandler(
    adminStudentDataValidationSchemas.adminStudentDeleteStudent
  ),
  expressAsyncHandler(adminStudentControllers.deleteStudent)
)
export default adminStudent
