import { Router } from 'express'
import * as adminClassroomControllers from './adminClassroom.controllers.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as dataValidationSchemas from './adminClassroom.dataValidationSchemas.js'
const adminClassroom = Router({ mergeParams: true })

adminClassroom.get(
  '/',
  dataValidationHandler(
    dataValidationSchemas.adminClassroomGetAllClassroomsSchema
  ),
  expressAsyncHandler(adminClassroomControllers.getAllClassrooms)
)
adminClassroom.put(
  '/changeClassroomState/:classroomId',
  dataValidationHandler(
    dataValidationSchemas.adminClassroomChangeClassroomStateSchema
  ),
  expressAsyncHandler(adminClassroomControllers.changeClassroomState)
)

adminClassroom.put(
  '/restoreClassroom/:classroomId',
  dataValidationHandler(
    dataValidationSchemas.adminClassroomRestoreClassroomSchema
  ),
  expressAsyncHandler(adminClassroomControllers.restoreClassroom)
)

adminClassroom
  .route('/:classroomId')
  .get(expressAsyncHandler(adminClassroomControllers.getClassroomUsingId))
  .put(
    dataValidationHandler(
      dataValidationSchemas.adminClassroomUpdateClassroomSchema
    ),
    expressAsyncHandler(adminClassroomControllers.updateClassroom)
  )
  .delete(expressAsyncHandler(adminClassroomControllers.deleteClassroom))

adminClassroom.get(
  '/courseClassrooms/:courseId',
  expressAsyncHandler(adminClassroomControllers.getClassroomUsingCourseId)
)

adminClassroom.post(
  '/',
  dataValidationHandler(
    dataValidationSchemas.adminClassroomCreateClassroomSchema
  ),
  expressAsyncHandler(adminClassroomControllers.createClassroom)
)

export default adminClassroom
