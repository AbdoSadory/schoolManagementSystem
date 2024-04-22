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
  .route('/classroom')
  .get(expressAsyncHandler(employeeControllers.allClassrooms))
  .post(
    dataValidationHandler(employeeValidationSchemas.createClassroomSchema),
    expressAsyncHandler(employeeControllers.createClassroom)
  )

employeeRouter
  .route('/classroom/:classroomId')
  .get(expressAsyncHandler(employeeControllers.getClassroomUsingId))
  .put(
    dataValidationHandler(employeeValidationSchemas.updateClassroomSchema),
    expressAsyncHandler(employeeControllers.updateClassroom)
  )
  .delete(
    dataValidationHandler(employeeValidationSchemas.deleteClassroomSchema),
    expressAsyncHandler(employeeControllers.d)
  )

employeeRouter
  .route('/course')
  .get(expressAsyncHandler(employeeControllers.allCourses))
  .post(
    dataValidationHandler(employeeValidationSchemas.createCourseSchema),
    expressAsyncHandler(employeeControllers.createCourse)
  )

employeeRouter
  .route('/course/:courseId')
  .get(expressAsyncHandler(employeeControllers.getCourseUsingId))
  .put(
    dataValidationHandler(employeeValidationSchemas.updateCourseSchema),
    expressAsyncHandler(employeeControllers.updateCourse)
  )
  .delete(
    dataValidationHandler(employeeValidationSchemas.deleteCourseSchema),
    expressAsyncHandler(employeeControllers.deleteCourse)
  )

employeeRouter.put(
  '/changeCourseState/:courseId',
  dataValidationHandler(employeeValidationSchemas.restoreCourseSchema),
  expressAsyncHandler(employeeControllers.changeCourseState)
)
export default employeeRouter
