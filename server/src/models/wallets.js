import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";

const Wallet = db.define("Wallet", {
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  walletAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Wallet;
