import User from "./models/users.js";

export const calculateDaily = async () => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();

    for (const user of users) {
      // Check if the user's total balance meets the minimum requirement
      if (user.totalBalance >= 500) {
        // Calculate the daily earnings based on the user's total balance
        let dailyEarningsPercentage = 0.35; // Modify this based on your conditions

        if (user.totalBalance >= 10000 && user.totalBalance < 100000) {
          dailyEarningsPercentage = 0.43;
        } else if (user.totalBalance >= 100000) {
          dailyEarningsPercentage = 0.5;
        }

        const dailyEarnings =
          (user.totalBalance * dailyEarningsPercentage) / 100;

        const roundedROI = Number((user.ROI + dailyEarnings).toFixed(1));

        // Update the user's ROI
        user.ROI = roundedROI;

        // Save the updated user information to the database
        await user.save();
      }
    }
  } catch (error) {
    console.error("Error calculating daily ROI:", error);
  }
};
