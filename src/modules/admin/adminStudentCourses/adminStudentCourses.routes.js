import expressAsyncHandler from 'express-async-handler'
import { Router } from 'express'
import * as adminStudentsCoursesControllers from './adminStudentCourses.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminStudentsCoursesDataValidationSchemas from './adminStudentCourses.dataValidationSchemas.js'

const adminStudentCourses = Router({ mergeParams: true })

adminStudentCourses.get(
  '/',
  dataValidationHandler(
    adminStudentsCoursesDataValidationSchemas.adminStudentsCoursesGetAllSchema
  ),
  expressAsyncHandler(adminStudentsCoursesControllers.getAllStudentCourses)
)

adminStudentCourses.post(
  '/addStudentCourses',
  dataValidationHandler(
    adminStudentsCoursesDataValidationSchemas.adminStudentsCoursesCreateSchema
  ),
  expressAsyncHandler(adminStudentsCoursesControllers.createStudentsCourses)
)

adminStudentCourses.put(
  '/restoreStudentCourse/:studentCourseId',
  dataValidationHandler(
    adminStudentsCoursesDataValidationSchemas.adminStudentsCoursesRestoreSchema
  ),
  expressAsyncHandler(adminStudentsCoursesControllers.restoreStudentsCourses)
)

adminStudentCourses
  .route('/:studentCourseId')
  .put(
    dataValidationHandler(
      adminStudentsCoursesDataValidationSchemas.adminStudentsCoursesUpdateSchema
    ),
    expressAsyncHandler(adminStudentsCoursesControllers.updateStudentsCourses)
  )
  .delete(
    dataValidationHandler(
      adminStudentsCoursesDataValidationSchemas.adminStudentsCoursesDeleteSchema
    ),
    expressAsyncHandler(adminStudentsCoursesControllers.deleteStudentsCourses)
  )
export default adminStudentCourses
