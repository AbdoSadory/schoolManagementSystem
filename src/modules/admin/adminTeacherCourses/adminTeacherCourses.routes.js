import expressAsyncHandler from 'express-async-handler'
import { Router } from 'express'
import * as adminTeachersCoursesControllers from './adminTeacherCourses.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminTeachersCoursesDataValidationSchemas from './adminTeacherCourses.dataValidationSchemas.js'

const adminTeacherCourses = Router({ mergeParams: true })

adminTeacherCourses.get(
  '/',
  dataValidationHandler(
    adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesGetAllSchema
  ),
  expressAsyncHandler(adminTeachersCoursesControllers.getAllTeachersCourses)
)

adminTeacherCourses.post(
  '/addTeachersCourses',
  dataValidationHandler(
    adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesCreateSchema
  ),
  expressAsyncHandler(adminTeachersCoursesControllers.createTeachersCourses)
)

adminTeacherCourses
  .route('/:teacherCourseId')
  .put(
    dataValidationHandler(
      adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesUpdateSchema
    ),
    expressAsyncHandler(adminTeachersCoursesControllers.updateTeachersCourses)
  )
  .delete(
    dataValidationHandler(
      adminTeachersCoursesDataValidationSchemas.adminTeachersCoursesDeleteSchema
    ),
    expressAsyncHandler(adminTeachersCoursesControllers.deleteTeachersCourses)
  )
export default adminTeacherCourses
