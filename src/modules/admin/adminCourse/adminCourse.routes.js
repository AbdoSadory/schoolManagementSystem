import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminCourseDataValidationSchemas from './adminCourse.dataValidationSchemas.js'
import * as adminCourseControllers from './adminCourse.controllers.js'
const adminCourse = Router({ mergeParams: true })

adminCourse.get('/', expressAsyncHandler(adminCourseControllers.getAllCourses))

adminCourse.post(
  '/createCourse',
  dataValidationHandler(
    adminCourseDataValidationSchemas.adminCourseCreateCourse
  ),
  expressAsyncHandler(adminCourseControllers.createCourse)
)

adminCourse.put(
  '/changeCourseState/:courseId',
  dataValidationHandler(
    adminCourseDataValidationSchemas.adminCourseRestoreCourseSchema
  ),
  expressAsyncHandler(adminCourseControllers.changeCourseState)
)

adminCourse.put(
  '/restoreCourse/:courseId',
  dataValidationHandler(
    adminCourseDataValidationSchemas.adminCourseRestoreCourseSchema
  ),
  expressAsyncHandler(adminCourseControllers.restoreCourse)
)

adminCourse
  .route('/:courseId')
  .get(expressAsyncHandler(adminCourseControllers.getCourseUsingId))
  .put(
    dataValidationHandler(
      adminCourseDataValidationSchemas.adminCourseUpdateCourse
    ),
    expressAsyncHandler(adminCourseControllers.updateCourse)
  )
  .delete(
    dataValidationHandler(
      adminCourseDataValidationSchemas.adminCourseDeleteCourse
    ),
    expressAsyncHandler(adminCourseControllers.deleteCourse)
  )

export default adminCourse
