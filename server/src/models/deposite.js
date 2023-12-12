// Deposit model
import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig.js";

const Deposit = db.define("Deposit", {
  // Define deposit model fields like investment plan, amount, payment method, status
  investmentPlan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
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
Deposit.sync({ alter: true });
export default Deposit;
