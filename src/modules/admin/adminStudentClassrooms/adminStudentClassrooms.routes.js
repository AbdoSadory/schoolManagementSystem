import expressAsyncHandler from 'express-async-handler'
import { Router } from 'express'
import * as adminStudentClassroomsControllers from './adminStudentClassrooms.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminStudentClassroomsDataValidationSchemas from './adminStudentClassrooms.dataValidationSchemas.js'

const adminStudentClassrooms = Router({ mergeParams: true })

adminStudentClassrooms.get(
  '/',
  dataValidationHandler(
    adminStudentClassroomsDataValidationSchemas.adminStudentsClassroomsGetAllSchema
  ),
  expressAsyncHandler(
    adminStudentClassroomsControllers.getAllStudentsClassrooms
  )
)

adminStudentClassrooms.post(
  '/addStudentClassroom',
  dataValidationHandler(
    adminStudentClassroomsDataValidationSchemas.adminStudentsClassroomsCreateSchema
  ),
  expressAsyncHandler(adminStudentClassroomsControllers.createStudentsClassroom)
)

adminStudentClassrooms.put(
  '/restoreStudentClassroom/:studentClassroomId',
  dataValidationHandler(
    adminStudentClassroomsDataValidationSchemas.adminStudentsClassroomsRestoreSchema
  ),
  expressAsyncHandler(
    adminStudentClassroomsControllers.restoreStudentsClassroom
  )
)

adminStudentClassrooms
  .route('/:studentClassroomId')
  .put(
    dataValidationHandler(
      adminStudentClassroomsDataValidationSchemas.adminStudentsClassroomsUpdateSchema
    ),
    expressAsyncHandler(
      adminStudentClassroomsControllers.updateStudentsClassroom
    )
  )
  .delete(
    dataValidationHandler(
      adminStudentClassroomsDataValidationSchemas.adminStudentsClassroomsDeleteSchema
    ),
    expressAsyncHandler(
      adminStudentClassroomsControllers.deleteStudentsClassroom
    )
  )
export default adminStudentClassrooms
