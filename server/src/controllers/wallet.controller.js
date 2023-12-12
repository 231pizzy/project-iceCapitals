import Wallet from "../models/wallets.js";

export const createWallet = async (req, res, next) => {
  try {
    const { accountName, walletAddress } = req.body;

    // Create a new deposit entry
    const newWallet = await Wallet.create({
      accountName,
      walletAddress,
    });

    res.status(201).json({
      message: "Wallet created successfully",
      wallet: newWallet,
    });
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ message: "Failed to create wallet" });
  }
};

export const getAllWallets = async (req, res, next) => {
  try {
    // Fetch all users from the database using Sequelize's findAll method
    const wallets = await Wallet.findAll();

    // If no users are found, return an appropriate message
    if (!wallets || wallets.length === 0) {
      return res.status(404).json({ message: "No wallets found" });
    }

    // Return the found users in the response
    res.status(200).json({ wallets });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error fetching wallets:", error);
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
};

export const getSingleWallet = async (req, res, next) => {
  const walletId = req.params.id;

  try {
    const wallet = await Wallet.findByPk(walletId);

    if (!wallet) {
      return res.status(404).json({ message: "wallet not found" });
    }

    res.status(200).json({ wallet });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ message: "Failed to fetch wallet" });
  }
};

export const updateWallet = async (req, res, next) => {
  try {
    const { accountName, walletAddress } = req.body;

    let updates = {
      accountName,
      walletAddress,
    };

    const [rowsUpdated, updatedWallet] = await Wallet.update(updates, {
      where: { id: req.params.id },
      returning: true, // To get the updated record
    });

    if (rowsUpdated === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user
    res.status(200).json(updatedWallet[0]); // Assuming you expect a single user to be updated
  } catch (error) {
    next(error);
  }
};
