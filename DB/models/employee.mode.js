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
      allowNull: true,
    },
    specialization: {
      type: DataTypes.ENUM,
      values: courseSpecializationEnum,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(255),
      required: true,
      defaultValue: 'employee',
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
        'https://res.cloudinary.com/dsjy29z66/image/upload/v1713295389/schoolManagementSystem/assets/profileImage.jpg',
    },
    profileImagePublic_Id: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      defaultValue: 'schoolManagementSystem/assets/profileImage',
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Employee
