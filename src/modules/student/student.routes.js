import { Router } from 'express'
import * as employeeControllers from './student.controllers.js'
import * as employeeValidationSchemas from './student.dataValidationSchemas.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'
import { authenticationHandler } from '../../middlewares/authenticationHandler.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import fileUploadingHandler from '../../middlewares/filesUploadingHandler.js'
import allowedExtensions from '../../utils/allowedExtensions.js'
import Student from '../../../DB/models/student.model.js'

const studentRouter = Router()
studentRouter.use(
  authenticationHandler(Student),
  authorizationHandler('student')
)
studentRouter.get(
  '/myProfile',
  expressAsyncHandler(employeeControllers.myProfile)
)
studentRouter.put(
  '/myProfile',
  fileUploadingHandler({ extensions: allowedExtensions.image }).single(
    'profileImage'
  ),
  dataValidationHandler(employeeValidationSchemas.UpdateProfileSchema),
  expressAsyncHandler(employeeControllers.updateProfile)
)

//======================classroom
studentRouter.get(
  '/myClassrooms',
  expressAsyncHandler(employeeControllers.getAllStudentsClassrooms)
)
//======================courses
studentRouter.get(
  '/myCourses',
  expressAsyncHandler(employeeControllers.getAllStudentCourses)
)
//======================courses result
studentRouter.get(
  '/myResults',
  expressAsyncHandler(employeeControllers.getAllCourseResults)
)

export default studentRouter
