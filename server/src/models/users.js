import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig.js";

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  totalBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  activeBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  ROI: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  withdrawal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

User.sync({ alter: true });

export default User;
