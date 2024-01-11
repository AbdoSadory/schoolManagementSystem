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

const adminRouter = Router()
adminRouter.use('/employee', adminEmployee)
adminRouter.use('/student', adminStudent)

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

export default adminRouter
