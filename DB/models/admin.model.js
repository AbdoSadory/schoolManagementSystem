import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'

const Admin = sql_config.define(
  'tbl_admin',
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
  },
  { timestamps: true, paranoid: true }
)

export default Admin
