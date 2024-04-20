import { Router } from 'express'
import * as employeeControllers from './employee.controllers.js'
import * as employeeValidationSchemas from './employee.dataValidationSchemas.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'
import { authenticationHandler } from '../../middlewares/authenticationHandler.js'
import Employee from '../../../DB/models/employee.mode.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import fileUploadingHandler from '../../middlewares/filesUploadingHandler.js'
import allowedExtensions from '../../utils/allowedExtensions.js'

const employeeRouter = Router()
employeeRouter.use(
  authenticationHandler(Employee),
  authorizationHandler('employee')
)
employeeRouter.get(
  '/myProfile',
  expressAsyncHandler(employeeControllers.myProfile)
)
employeeRouter.put(
  '/myProfile',
  fileUploadingHandler({ extensions: allowedExtensions.image }).single(
    'profileImage'
  ),
  dataValidationHandler(employeeValidationSchemas.UpdateProfileSchema),
  expressAsyncHandler(employeeControllers.updateProfile)
)
employeeRouter.get(
  '/profile/:employeeId',
  expressAsyncHandler(employeeControllers.employeeProfile)
)

employeeRouter.get(
  '/financial',
  expressAsyncHandler(employeeControllers.allFinance)
)

employeeRouter
  .route('/classrooms')
  .get(expressAsyncHandler(employeeControllers.allClassrooms))
  .post(
    dataValidationHandler(employeeValidationSchemas.createClassroomSchema),
    expressAsyncHandler(employeeControllers.createClassroom)
  )

employeeRouter
  .route('/classrooms/:classroomId')
  .get(expressAsyncHandler(employeeControllers.getClassroomUsingId))
  .put(
    dataValidationHandler(employeeValidationSchemas.updateClassroomSchema),
    expressAsyncHandler(employeeControllers.updateClassroom)
  )

employeeRouter
  .route('/courses')
  .get(expressAsyncHandler(employeeControllers.allCourses))
  .post(
    dataValidationHandler(employeeValidationSchemas.createCourseSchema),
    expressAsyncHandler(employeeControllers.createCourse)
  )

employeeRouter
  .route('/courses/:courseId')
  .get(expressAsyncHandler(employeeControllers.getCourseUsingId))
  .put(
    dataValidationHandler(employeeValidationSchemas.updateCourseSchema),
    expressAsyncHandler(employeeControllers.updateCourse)
  )
export default employeeRouter
