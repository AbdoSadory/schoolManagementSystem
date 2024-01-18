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
  '/updateCourse/:courseId',
  dataValidationHandler(
    adminCourseDataValidationSchemas.adminCourseUpdateCourse
  ),
  expressAsyncHandler(adminCourseControllers.updateCourse)
)

adminCourse.delete(
  '/deleteCourse/:courseId',
  expressAsyncHandler(adminCourseControllers.deleteCourse)
)
export default adminCourse
