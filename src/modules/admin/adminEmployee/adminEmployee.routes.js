import { Router } from 'express'
import * as adminEmployeeControllers from './adminEmpoyee.controllers.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminEmployeeDataValidationSchemas from './adminEmployee.dataValidationSchemas.js'
import fileUploadingHandler from '../../../middlewares/filesUploadingHandler.js'
import allowedExtensions from '../../../utils/allowedExtensions.js'
const adminEmployee = Router({ mergeParams: true })

adminEmployee.get(
  '/',
  expressAsyncHandler(adminEmployeeControllers.getAllEmployees)
)
adminEmployee.get(
  '/getEmployeeByEmail',
  expressAsyncHandler(adminEmployeeControllers.getEmployeeByEmail)
)
adminEmployee.post(
  '/createEmployee',
  dataValidationHandler(
    adminEmployeeDataValidationSchemas.adminEmployeeCreateEmployee
  ),
  expressAsyncHandler(adminEmployeeControllers.createEmployee)
)

adminEmployee.put(
  '/updateEmployee',
  fileUploadingHandler({ extensions: allowedExtensions.image }).single(
    'profileImage'
  ),
  dataValidationHandler(
    adminEmployeeDataValidationSchemas.adminEmployeeUpdateEmployee
  ),
  expressAsyncHandler(adminEmployeeControllers.updateEmployee)
)
adminEmployee.delete(
  '/deleteEmployee',
  dataValidationHandler(
    adminEmployeeDataValidationSchemas.adminEmployeeDeleteEmployee
  ),
  expressAsyncHandler(adminEmployeeControllers.deleteEmployee)
)

export default adminEmployee
