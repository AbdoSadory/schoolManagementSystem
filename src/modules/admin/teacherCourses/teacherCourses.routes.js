import expressAsyncHandler from 'express-async-handler'
import { Router } from 'express'
import * as adminTeachersCoursesControllers from './teacherCourses.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminTeachersCoursesDataValidationSchemas from './teacherCourses.dataValidationSchemas.js'

const adminTeacherCourses = Router({ mergeParams: true })

adminTeacherCourses.get(
  '/',
  dataValidationHandler(
    adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesGetAllTeachersCoursesSchema
  ),
  expressAsyncHandler(adminTeachersCoursesControllers.getAllTeachersCourses)
)

adminTeacherCourses.post(
  '/addTeachersCourses',
  dataValidationHandler(
    adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesCreateTeachersCoursesSchema
  ),
  expressAsyncHandler(adminTeachersCoursesControllers.createTeachersCourses)
)

adminTeacherCourses
  .route('/:teacherCourseId')
  .put(
    dataValidationHandler(
      adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesUpdateTeachersCoursesSchema
    ),
    expressAsyncHandler(adminTeachersCoursesControllers.updateTeachersCourses)
  )
  .delete(
    dataValidationHandler(
      adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesDeleteTeachersCoursesSchema
    ),
    expressAsyncHandler(adminTeachersCoursesControllers.deleteTeachersCourses)
  )
export default adminTeacherCourses
