import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
import {
  courseSpecializationEnum,
  educationDegreeEnum,
  employeePositionEnum,
  employeeTypeEnum,
  genderEnum,
  maritalStatusEnum,
} from '../../src/utils/generalConstants.js'

const Employee = sql_config.define(
  'tbl_employee',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    nationalID: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      unique: true,
    },
    nationality: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: genderEnum,
      required: true,
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.ENUM,
      values: maritalStatusEnum,
      required: true,
      allowNull: false,
    },
    graduationYear: {
      type: DataTypes.DATEONLY, // string, "1990-01-01"
      required: true,
      allowNull: false,
    },
    educationDegree: {
      type: DataTypes.ENUM,
      values: educationDegreeEnum,
      required: true,
      allowNull: false,
    },
    employeePosition: {
      type: DataTypes.ENUM,
      values: employeePositionEnum,
      required: true,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.ENUM,
      values: courseSpecializationEnum,
      allowNull: true,
    },
    employeeType: {
      type: DataTypes.ENUM,
      values: employeeTypeEnum,
      required: true,
      allowNull: false,
    },
    profileImagePath: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      defaultValue:
        'https://res.cloudinary.com/dsjy29z66/image/upload/v1705178632/schoolManagementSystem/assets/imgs/defaultProfileImage_n7ycr5.png',
    },
    profileImagePublic_Id: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      defaultValue:
        'schoolManagementSystem/assets/imgs/defaultProfileImage_n7ycr5',
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Employee
