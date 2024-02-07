import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
import {
  feesStatusEnum,
  genderEnum,
  gradeEnum,
} from '../../src/utils/generalConstants.js'
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
      values: feesStatusEnum,
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
      values: genderEnum,
      required: true,
      allowNull: false,
    },
    grade: {
      type: DataTypes.ENUM,
      values: gradeEnum,
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
  },
  { timestamps: true, paranoid: true }
)

export default Student
