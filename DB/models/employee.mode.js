import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'

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
      values: ['male', 'female'],
      required: true,
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.ENUM,
      values: ['married', 'widowed', 'separated', 'divorced', 'single'],
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
      values: ['associate', 'bachelor', 'master', 'doctorate'],
      required: true,
      allowNull: false,
    },
    employeePosition: {
      type: DataTypes.ENUM,
      values: ['junior', 'mid-level', 'senior', 'team-leader', 'manager'],
      required: true,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.ENUM,
      values: [
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology',
      ],
      allowNull: true,
    },
    employeeType: {
      type: DataTypes.ENUM,
      values: ['owner', 'ceo', 'teacher', 'director', 'hr', 'others'],
      required: true,
      allowNull: false,
    },
    profileImagePath: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      defaultValue:
        'schoolManagementSystem/assets/imgs/defaultProfileImage.png',
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Employee
