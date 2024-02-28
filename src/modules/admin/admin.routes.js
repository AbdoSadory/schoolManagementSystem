import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as adminControllers from './admin.controllers.js'
import * as adminDataValidationSchemas from './admin.dataValidationSchemas.js'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'
import { authenticationHandler } from '../../middlewares/authenticationHandler.js'
import Admin from '../../../DB/models/admin.model.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import adminEmployee from './adminEmployee/adminEmployee.routes.js'
import adminStudent from './adminStudent/adminStudent.routes.js'
import adminCourse from './adminCourse/adminCourse.routes.js'
import adminFinance from './adminFinance/adminFinance.routes.js'
import adminClassroom from './adminClassroom/adminClassroom.routes.js'
import adminCourseResults from './adminCourseResults/adminCourseResults.routes.js'
import adminTeacherCourses from './adminTeacherCourses/adminTeacherCourses.routes.js'
import adminTeacherClassrooms from './adminTeacherClassrooms/adminTeacherClassrooms.routes.js'
import adminStudentCourses from './adminStudentCourses/adminStudentCourses.routes.js'

const adminRouter = Router()

adminRouter.post(
  '/signIn',
  dataValidationHandler(adminDataValidationSchemas.adminSignInSchema),
  expressAsyncHandler(adminControllers.signIn)
)
adminRouter.use(authenticationHandler(Admin), authorizationHandler('admin'))
adminRouter.post(
  '/signUp',
  dataValidationHandler(adminDataValidationSchemas.adminSignUpSchema),
  expressAsyncHandler(adminControllers.signUp)
)
adminRouter.use('/employee', adminEmployee)
adminRouter.use('/student', adminStudent)
adminRouter.use('/course', adminCourse)
adminRouter.use('/finance', adminFinance)
adminRouter.use('/classroom', adminClassroom)
adminRouter.use('/courseResults', adminCourseResults)
adminRouter.use('/teacherCourses', adminTeacherCourses)
adminRouter.use('/teacherClassrooms', adminTeacherClassrooms)
adminRouter.use('/studentCourses', adminStudentCourses)
export default adminRouter
