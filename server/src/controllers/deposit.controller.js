import { errorHandler } from "../utils/error.js";
import Deposit from "../models/deposite.js";
import User from "../models/users.js";

export const deposite = async (req, res, next) => {
  try {
    const { investmentPlan, amount, paymentMethod, userId, status } = req.body;

    // Create a new deposit entry
    const newDeposit = await Deposit.create({
      investmentPlan,
      amount,
      paymentMethod,
      userId, // Assuming userId is sent in the request body or obtained from the logged-in user
      status,
    });

    res.status(201).json({
      message: "Deposit created successfully",
      deposit: newDeposit,
    });
  } catch (error) {
    console.error("Error creating deposit:", error);
    res.status(500).json({ message: "Failed to create deposit" });
  }
};

export const updateTotalBalance = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const approvedDeposits = await Deposit.findAll({
      where: {
        userId: userId,
        status: "approved",
      },
    });

    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total approved amount from deposits
    const totalApprovedAmount = approvedDeposits.reduce((total, deposit) => {
      return total + deposit.amount;
    }, 0);

    if (user.totalBalance === 0) {
      user.totalBalance = totalApprovedAmount;
    } else if (user.totalBalance > totalApprovedAmount) {
    } else {
      const amountToAdd = totalApprovedAmount - user.totalBalance;
      user.totalBalance += amountToAdd;
    }
    await user.save();

    return res.status(200).json({ totalBalance: user.totalBalance });
  } catch (error) {
    console.error("Error updating total balance:", error);
    return res.status(500).json({ message: "Failed to update total balance" });
  }
};

export const getUserDeposit = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the listing by ID using Sequelize's findOne method
    const userDeposits = await Deposit.findAll({ where: { userId: userId } });

    if (!userDeposits) {
      return res.status(404).json({ message: "deposit history not found!" });
    }

    // If the listing is found, return it in the response
    res.status(200).json(userDeposits);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching deposit:", error);
    res.status(500).json({ message: "Failed to fetch deposit" });
  }
};

export const getAllDeposits = async (req, res, next) => {
  try {
    // Fetch all users from the database using Sequelize's findAll method
    const deposits = await Deposit.findAll();

    // If no users are found, return an appropriate message
    if (!deposits || deposits.length === 0) {
      return res.status(404).json({ message: "No Deposits found" });
    }

    // Return the found users in the response
    res.status(200).json({ deposits });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error fetching deposits:", error);
    res.status(500).json({ message: "Failed to fetch deposits" });
  }
};

// get single deposit
export const getSingleDeposit = async (req, res, next) => {
  const depositId = req.params.id;

  try {
    const deposit = await Deposit.findByPk(depositId);

    if (!deposit) {
      return res.status(404).json({ message: "deposit not found" });
    }

    res.status(200).json({ deposit });
  } catch (error) {
    console.error("Error fetching deposit:", error);
    res.status(500).json({ message: "Failed to fetch deposit" });
  }
};

export const updateDeposit = async (req, res, next) => {
  try {
    const { investmentPlan, amount, paymentMethod, status } = req.body;

    let updates = {
      investmentPlan,
      amount,
      paymentMethod,
      status,
    };

    const [rowsUpdated, updatedDeposit] = await Deposit.update(updates, {
      where: { id: req.params.id },
      returning: true, // To get the updated record
    });

    if (rowsUpdated === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user
    res.status(200).json(updatedDeposit[0]); // Assuming you expect a single user to be updated
  } catch (error) {
    next(error);
  }
};

export const deleteDeposit = async (req, res, next) => {
  const depositId = req.params.id; // Get the user ID from the request parameters

  try {
    const deposit = await Deposit.findByPk(depositId); // Find the user by their ID

    if (!deposit) {
      return res.status(404).json({ message: "User not found" });
    }

    await deposit.destroy(); // Delete the user

    res.status(200).json({ message: "deposit deleted successfully" });
  } catch (error) {
    console.error("Error deleting deposit:", error);
    res.status(500).json({ message: "Failed to delete deposit" });
  }
};
