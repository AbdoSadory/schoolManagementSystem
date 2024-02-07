import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as adminCourseResultsControllers from './adminCourseResults.controllers.js'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminCourseResultsSchemas from './adminCourseResults.dataValidationSchemas.js'

const adminCourseResults = Router({ mergeParams: true })

adminCourseResults.get(
  '/',
  expressAsyncHandler(adminCourseResultsControllers.getAllCourseResults)
)

adminCourseResults.post(
  '/',
  dataValidationHandler(
    adminCourseResultsSchemas.adminCourseResultCreateCourseResultSchema
  ),
  expressAsyncHandler(adminCourseResultsControllers.createCourseResult)
)

adminCourseResults
  .route('/:courseResultId')
  .get(
    dataValidationHandler(
      adminCourseResultsSchemas.adminCourseResultGetCourseResultByIdSchema
    ),
    expressAsyncHandler(adminCourseResultsControllers.getCourseResultById)
  )
  .put(
    dataValidationHandler(
      adminCourseResultsSchemas.adminCourseResultUpdateCourseResultSchema
    ),
    expressAsyncHandler(adminCourseResultsControllers.updateCourseResult)
  )
  .delete(
    dataValidationHandler(
      adminCourseResultsSchemas.adminCourseResultDeleteCourseResultSchema
    ),
    expressAsyncHandler(adminCourseResultsControllers.deleteCourseResult)
  )

adminCourseResults.get(
  '/course/:courseId',
  dataValidationHandler(
    adminCourseResultsSchemas.adminCourseResultGetCourseResultByCourseIdSchema
  ),
  expressAsyncHandler(adminCourseResultsControllers.getCourseResultByCourseId)
)

adminCourseResults.get(
  '/student/:studentId',
  dataValidationHandler(
    adminCourseResultsSchemas.adminCourseResultGetCourseResultByStudentIdSchema
  ),
  expressAsyncHandler(adminCourseResultsControllers.getCourseResultByStudentId)
)

export default adminCourseResults
