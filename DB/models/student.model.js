import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
const Student = sql_config.define(
  'tbl_student',
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
    phoneNumber: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      unique: true,
    },
    parentPhoneNumber: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
      unique: true,
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
      defaultValue:
        'schoolManagementSystem/assets/imgs/defaultProfileImage.png',
    },
  },
  { timestamps: true, paranoid: true }
)

export default Student
