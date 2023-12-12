import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";

const Withdrawal = db.define("Withdrawal", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Withdrawal;
