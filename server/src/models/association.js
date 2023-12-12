import User from "./users.js";
import Deposit from "./deposits.js";
import Withdrawal from "./withdrawals.js";

// Define associations here
Deposit.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Deposit, { foreignKey: "userId" });

Withdrawal.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Withdrawal, { foreignKey: "userId" });

// Export models
export { User, Deposit, Withdrawal };
