import { Router } from 'express'
import * as adminEmployeeControllers from './adminEmpoyee.controllers.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminEmployeeDataValidationSchemas from './adminEmployee.dataValidationSchemas.js'
const adminEmployee = Router({ mergeParams: true })

adminEmployee.get(
  '/',
  expressAsyncHandler(adminEmployeeControllers.getAllEmployees)
)
adminEmployee.get(
  '/:employeeId',
  expressAsyncHandler(adminEmployeeControllers.getEmployee)
)
adminEmployee.post(
  '/createEmployee',
  expressAsyncHandler(adminEmployeeControllers.createEmployee)
)
adminEmployee.put(
  '/updateEmployee',
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
