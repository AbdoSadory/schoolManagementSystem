import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
const Finance = sql_config.define(
  'tbl_finance',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      unique: true,
    },
    budget: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    salaries: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    supplement: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    maintenance: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade1: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade2: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade3: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade4: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade5: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade6: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade7: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade8: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    feesGrade9: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    activities: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    utilities: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Finance
