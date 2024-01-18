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
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    salaries: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    supplement: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    maintenance: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade1: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade2: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade3: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade4: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade5: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade6: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade7: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade8: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    feesGrade9: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    activities: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
    utilities: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Finance
