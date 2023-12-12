import User from "../models/users.js";
import Withdrawal from "../models/withdrawal.js";

export const withdrawal = async (req, res, next) => {
  const userId = req.params.id; // Get userId from route params
  try {
    const { amount, paymentMethod, paymentAddress, status } = req.body;

    // Find the user by userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if User.ROI is greater than 10 and withdrawal amount is valid
    if (user.ROI > 49 && amount <= user.ROI) {
      // Deduct withdrawal amount from User.ROI
      user.ROI -= amount;

      // Create a new withdrawal entry with userId obtained from route params
      const newWithdrawal = await Withdrawal.create({
        amount,
        paymentMethod,
        paymentAddress,
        userId, // Using userId obtained from route params
        status,
      });

      // Save the updated User.ROI to the database
      await user.save();

      return res.status(201).json({
        message: "Withdrawal created successfully",
        withdrawal: newWithdrawal,
        userROI: user.ROI, // Sending updated User.ROI in the response
      });
    } else {
      return res.status(400).json({
        message: "Withdrawal amount exceeds available ROI or is invalid",
      });
    }
  } catch (error) {
    console.error("Error creating Withdrawal:", error);
    res.status(500).json({ message: "Failed to create withdrawal" });
  }
};

export const updateWithdrawal = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const allWithdrawals = await Withdrawal.findAll({
      where: {
        userId: userId,
      },
    });

    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total approved amount from deposits
    const totalwithdrawalAmount = allWithdrawals.reduce((total, withdrawal) => {
      return total + withdrawal.amount;
    }, 0);

    if (user.withdrawal === 0) {
      user.withdrawal = totalwithdrawalAmount;
    } else {
      const amountToAdd = totalwithdrawalAmount - user.withdrawal;
      user.withdrawal += amountToAdd;
    }
    await user.save();

    return res.status(200).json({ withdrawalBalance: user.withdrawal });
  } catch (error) {
    console.error("Error updating total balance:", error);
    return res.status(500).json({ message: "Failed to update total balance" });
  }
};

export const getUserwithdrawals = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the listing by ID using Sequelize's findOne method
    const userWithdrawals = await Withdrawal.findAll({
      where: { userId: userId },
    });

    if (!userWithdrawals) {
      return res.status(404).json({ message: "Withdrawal history not found!" });
    }

    // If the listing is found, return it in the response
    res.status(200).json(userWithdrawals);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching deposit:", error);
    res.status(500).json({ message: "Failed to fetch deposit" });
  }
};

export const getAllWithdrawals = async (req, res, next) => {
  try {
    // Fetch all users from the database using Sequelize's findAll method
    const withdrawal = await Withdrawal.findAll();

    // If no users are found, return an appropriate message
    if (!withdrawal || withdrawal.length === 0) {
      return res.status(404).json({ message: "No withdrawal found" });
    }

    // Return the found users in the response
    res.status(200).json({ withdrawal });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error fetching withdrawal:", error);
    res.status(500).json({ message: "Failed to fetch withdrawal" });
  }
};

export const getSingleWithdrawal = async (req, res, next) => {
  const withdrawalId = req.params.id;

  try {
    const withdrawal = await Withdrawal.findByPk(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({ message: "withdrawal not found" });
    }

    res.status(200).json({ withdrawal });
  } catch (error) {
    console.error("Error fetching withdrawal:", error);
    res.status(500).json({ message: "Failed to fetch withdrawal" });
  }
};

export const adminUpdateWithdrawal = async (req, res, next) => {
  try {
    const { amount, paymentMethod, paymentAddress, status } = req.body;

    let updates = {
      amount,
      paymentMethod,
      paymentAddress,
      status,
    };

    const [rowsUpdated, updatedWithdrawal] = await Withdrawal.update(updates, {
      where: { id: req.params.id },
      returning: true, // To get the updated record
    });

    if (rowsUpdated === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user
    res.status(200).json(updatedWithdrawal[0]); // Assuming you expect a single user to be updated
  } catch (error) {
    next(error);
  }
};

export const deleteWithdrawal = async (req, res, next) => {
  const withdrawalId = req.params.id; // Get the user ID from the request parameters

  try {
    const withdrawal = await Withdrawal.findByPk(withdrawalId); // Find the user by their ID

    if (!withdrawal) {
      return res.status(404).json({ message: "User not found" });
    }

    await withdrawal.destroy(); // Delete the user

    res.status(200).json({ message: "withdrawal deleted successfully" });
  } catch (error) {
    console.error("Error deleting withdrawal:", error);
    res.status(500).json({ message: "Failed to delete withdrawal" });
  }
};
