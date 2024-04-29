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

//======================classroom
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

//====================== course
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

//====================== Course Results
employeeRouter
  .route('/courseResults')
  .get(expressAsyncHandler(employeeControllers.getAllCourseResults))
  .post(
    dataValidationHandler(employeeValidationSchemas.createCourseResultSchema),
    expressAsyncHandler(employeeControllers.createCourseResult)
  )
employeeRouter.put(
  '/restoreCourseResult/:courseResultId',
  dataValidationHandler(employeeValidationSchemas.restoreCourseResultSchema),
  expressAsyncHandler(employeeControllers.restoreCourseResult)
)
employeeRouter
  .route('/courseResults/:courseResultId')
  .get(
    dataValidationHandler(employeeValidationSchemas.getCourseResultByIdSchema),
    expressAsyncHandler(employeeControllers.getCourseResultById)
  )
  .put(
    dataValidationHandler(employeeValidationSchemas.updateCourseResultSchema),
    expressAsyncHandler(employeeControllers.updateCourseResult)
  )
  .delete(
    dataValidationHandler(employeeValidationSchemas.deleteCourseResultSchema),
    expressAsyncHandler(employeeControllers.deleteCourseResult)
  )

//====================== Student
employeeRouter.get(
  '/students',
  expressAsyncHandler(employeeControllers.getAllStudents)
)

//====================== Teacher Courses
employeeRouter
  .route('/teacherCourses')
  .get(
    dataValidationHandler(employeeValidationSchemas.getTeachersCoursesSchema),
    expressAsyncHandler(employeeControllers.getAllTeachersCourses)
  )
  .post(
    dataValidationHandler(
      employeeValidationSchemas.adminTeachersCoursesCreateSchema
    ),
    expressAsyncHandler(employeeControllers.createTeachersCourses)
  )

employeeRouter.put(
  '/restoreTeacherCourse/:teacherCourseId',
  dataValidationHandler(employeeValidationSchemas.restoreTeachersCoursesSchema),
  expressAsyncHandler(employeeControllers.restoreTeachersCourses)
)

employeeRouter
  .route('/teacherCourses/:teacherCourseId')
  .put(
    dataValidationHandler(
      employeeValidationSchemas.updateTeachersCoursesSchema
    ),
    expressAsyncHandler(employeeControllers.updateTeachersCourses)
  )
  .delete(
    dataValidationHandler(
      employeeValidationSchemas.deleteTeachersCoursesSchema
    ),
    expressAsyncHandler(employeeControllers.deleteTeachersCourses)
  )

//====================== Teacher Classroom
employeeRouter
  .route('/teacherClassrooms')
  .get(
    dataValidationHandler(
      employeeValidationSchemas.getTeachersClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.getAllTeachersClassrooms)
  )
  .post(
    dataValidationHandler(
      employeeValidationSchemas.createTeachersClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.createTeachersClassroom)
  )

employeeRouter.put(
  '/restoreTeacherClassroom/:teacherClassroomId',
  dataValidationHandler(
    employeeValidationSchemas.restoreTeachersClassroomsSchema
  ),
  expressAsyncHandler(employeeControllers.restoreTeachersClassrooms)
)

employeeRouter
  .route('/teacherClassrooms/:teacherClassroomId')
  .put(
    dataValidationHandler(
      employeeValidationSchemas.updateTeachersClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.updateTeachersClassroom)
  )
  .delete(
    dataValidationHandler(
      employeeValidationSchemas.deleteTeachersClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.deleteTeachersClassrooms)
  )
export default employeeRouter
