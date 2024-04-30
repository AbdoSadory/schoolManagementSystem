import { Router } from 'express'
import * as employeeControllers from './student.controllers.js'
import * as employeeValidationSchemas from './student.dataValidationSchemas.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'
import { authenticationHandler } from '../../middlewares/authenticationHandler.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import fileUploadingHandler from '../../middlewares/filesUploadingHandler.js'
import allowedExtensions from '../../utils/allowedExtensions.js'
import Student from '../../../DB/models/student.model.js'

const studentRouter = Router()
studentRouter.use(
  authenticationHandler(Student),
  authorizationHandler('student')
)
studentRouter.get(
  '/myProfile',
  expressAsyncHandler(employeeControllers.myProfile)
)
studentRouter.put(
  '/myProfile',
  fileUploadingHandler({ extensions: allowedExtensions.image }).single(
    'profileImage'
  ),
  dataValidationHandler(employeeValidationSchemas.UpdateProfileSchema),
  expressAsyncHandler(employeeControllers.updateProfile)
)

//======================classroom
studentRouter
  .route('/classroom')
  .get(expressAsyncHandler(employeeControllers.allClassrooms))
  .post(
    dataValidationHandler(employeeValidationSchemas.createClassroomSchema),
    expressAsyncHandler(employeeControllers.createClassroom)
  )

studentRouter
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
studentRouter
  .route('/course')
  .get(expressAsyncHandler(employeeControllers.allCourses))
  .post(
    dataValidationHandler(employeeValidationSchemas.createCourseSchema),
    expressAsyncHandler(employeeControllers.createCourse)
  )

studentRouter
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

studentRouter.put(
  '/changeCourseState/:courseId',
  dataValidationHandler(employeeValidationSchemas.restoreCourseSchema),
  expressAsyncHandler(employeeControllers.changeCourseState)
)

//====================== Course Results
studentRouter
  .route('/courseResults')
  .get(expressAsyncHandler(employeeControllers.getAllCourseResults))
  .post(
    dataValidationHandler(employeeValidationSchemas.createCourseResultSchema),
    expressAsyncHandler(employeeControllers.createCourseResult)
  )
studentRouter.put(
  '/restoreCourseResult/:courseResultId',
  dataValidationHandler(employeeValidationSchemas.restoreCourseResultSchema),
  expressAsyncHandler(employeeControllers.restoreCourseResult)
)
studentRouter
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
studentRouter.get(
  '/students',
  expressAsyncHandler(employeeControllers.getAllStudents)
)

//====================== Teacher Courses
studentRouter
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

studentRouter.put(
  '/restoreTeacherCourse/:teacherCourseId',
  dataValidationHandler(employeeValidationSchemas.restoreTeachersCoursesSchema),
  expressAsyncHandler(employeeControllers.restoreTeachersCourses)
)

studentRouter
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
studentRouter
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

studentRouter.put(
  '/restoreTeacherClassroom/:teacherClassroomId',
  dataValidationHandler(
    employeeValidationSchemas.restoreTeachersClassroomsSchema
  ),
  expressAsyncHandler(employeeControllers.restoreTeachersClassrooms)
)

studentRouter
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

//====================== student Course
studentRouter
  .route('/studentCourses')
  .get(
    dataValidationHandler(employeeValidationSchemas.getStudentsCoursesSchema),
    expressAsyncHandler(employeeControllers.getAllStudentCourses)
  )
  .post(
    dataValidationHandler(
      employeeValidationSchemas.createStudentsCoursesSchema
    ),
    expressAsyncHandler(employeeControllers.createStudentsCourses)
  )

studentRouter.put(
  '/restoresStudentCourse/:studentCourseId',
  dataValidationHandler(employeeValidationSchemas.restoreStudentsCoursesSchema),
  expressAsyncHandler(employeeControllers.restoreStudentsCourses)
)

studentRouter
  .route('/studentCourses/:studentCourseId')
  .put(
    dataValidationHandler(
      employeeValidationSchemas.updateStudentsCoursesSchema
    ),
    expressAsyncHandler(employeeControllers.updateStudentsCourses)
  )
  .delete(
    dataValidationHandler(
      employeeValidationSchemas.deleteStudentsCoursesSchema
    ),
    expressAsyncHandler(employeeControllers.deleteStudentsCourses)
  )

//====================== student Classroom

studentRouter
  .route('/studentClassrooms')
  .get(
    dataValidationHandler(
      employeeValidationSchemas.getStudentsClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.getAllStudentsClassrooms)
  )
  .post(
    dataValidationHandler(
      employeeValidationSchemas.createStudentsClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.createStudentsClassroom)
  )

studentRouter.put(
  '/restoresStudentClassroom/:studentClassroomId',
  dataValidationHandler(
    employeeValidationSchemas.restoreStudentsClassroomsSchema
  ),
  expressAsyncHandler(employeeControllers.restoreStudentsClassroom)
)

studentRouter
  .route('/studentClassrooms/:studentClassroomId')
  .put(
    dataValidationHandler(
      employeeValidationSchemas.updateStudentsClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.updateStudentsClassroom)
  )
  .delete(
    dataValidationHandler(
      employeeValidationSchemas.deleteStudentsClassroomsSchema
    ),
    expressAsyncHandler(employeeControllers.deleteStudentsClassroom)
  )
export default studentRouter
