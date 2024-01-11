import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
const Student = sql_config.define(
  'tbl_student',
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
    phoneNumber: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    parentPhoneNumber: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    totalFees: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
    },
    paidFees: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
    },
    feesStatus: {
      type: DataTypes.ENUM,
      values: ['paid', 'notPaid'],
      required: true,
      allowNull: false,
    },
    nationality: {
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
    grade: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      required: true,
      allowNull: false,
    },
    profileImagePath: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Student
