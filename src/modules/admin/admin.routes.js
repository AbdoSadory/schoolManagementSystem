import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as adminControllers from './admin.controllers.js'
import * as adminDataValidationSchemas from './admin.dataValidationSchemas.js'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'
import { authenticationHandler } from '../../middlewares/authenticationHandler.js'
import Admin from '../../../DB/models/admin.model.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import * as adminNestedRoutes from './admin-nested-routes.js'

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
adminRouter.use('/employee', adminNestedRoutes.adminEmployee)
adminRouter.use('/student', adminNestedRoutes.adminStudent)
adminRouter.use('/course', adminNestedRoutes.adminCourse)
adminRouter.use('/finance', adminNestedRoutes.adminFinance)
adminRouter.use('/classroom', adminNestedRoutes.adminClassroom)
adminRouter.use('/courseResults', adminNestedRoutes.adminCourseResults)
adminRouter.use('/teacherCourses', adminNestedRoutes.adminTeacherCourses)
adminRouter.use('/teacherClassrooms', adminNestedRoutes.adminTeacherClassrooms)
adminRouter.use('/studentCourses', adminNestedRoutes.adminStudentCourses)
adminRouter.use('/studentClassrooms', adminNestedRoutes.adminStudentClassrooms)
export default adminRouter
