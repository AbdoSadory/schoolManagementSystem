import expressAsyncHandler from 'express-async-handler'
import { Router } from 'express'
import * as adminTeacherClassroomsControllers from './adminTeacherClassrooms.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminTeacherClassroomsDataValidationSchemas from './adminTeacherClassrooms.dataValidationSchemas.js'

const adminTeacherClassrooms = Router({ mergeParams: true })

adminTeacherClassrooms.get(
  '/',
  dataValidationHandler(
    adminTeacherClassroomsDataValidationSchemas.adminTeachersClassroomsGetAllSchema
  ),
  expressAsyncHandler(
    adminTeacherClassroomsControllers.getAllTeachersClassrooms
  )
)

adminTeacherClassrooms.post(
  '/addTeacherClassroom',
  dataValidationHandler(
    adminTeacherClassroomsDataValidationSchemas.adminTeachersClassroomsCreateSchema
  ),
  expressAsyncHandler(adminTeacherClassroomsControllers.createTeachersClassroom)
)

adminTeacherClassrooms
  .route('/:teacherClassroomId')
  .put(
    dataValidationHandler(
      adminTeacherClassroomsDataValidationSchemas.adminTeachersClassroomsUpdateSchema
    ),
    expressAsyncHandler(
      adminTeacherClassroomsControllers.updateTeachersClassroom
    )
  )
  .delete(
    dataValidationHandler(
      adminTeacherClassroomsDataValidationSchemas.adminTeachersClassroomsDeleteSchema
    ),
    expressAsyncHandler(adminTeacherClassroomsControllers.deleteTeachersCourses)
  )
export default adminTeacherClassrooms
