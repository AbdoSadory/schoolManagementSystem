import { DataTypes } from 'sequelize'
import { sql_config } from '../connection'

const Employee = sql_config.define(
  'tbl_employee',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.DATEONLY,
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
      required: true,
      allowNull: false,
    },
    employeeType: {
      type: DataTypes.ENUM,
      values: ['Owner', 'CEO', 'teacher', 'director', 'hr', 'others'],
      required: true,
      allowNull: false,
    },
    profileImagePath: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Employee
