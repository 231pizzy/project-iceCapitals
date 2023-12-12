import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { errorHandler } from "../utils/error.js";
import User from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, country, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account already exists. Kindly login." });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = await User.create({
        id: v4(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone,
        country,
        password: hashedPassword,
      });

      return res.status(200).json({
        message: `Account is created successfully`,
        newUser,
      });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Handle validation errors here
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ errors: validationErrors });
    } else {
      // Log Sequelize error
      console.error("Sequelize Error:", error); // Add this line to log the Sequelize error
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    const validUser = await User.findOne({ where: { email: normalizedEmail } }); // Include 'where' clause here

    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    if (!process.env.JWT_SECRET) {
      return next(errorHandler(500, "JWT secret is not defined"));
    }

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET); // Update '_id' to 'id'

    const { password: pass, ...rest } = validUser.toJSON(); // Use toJSON() to remove password from the returned user data

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const { firstName, lastName, country, phone, email, password } = req.body;

    let updates = {
      firstName,
      lastName,
      country,
      phone,
      email,
    };

    if (password) {
      updates.password = bcryptjs.hashSync(password, 10);
    }

    const [rowsUpdated, updatedUsers] = await User.update(updates, {
      where: { id: req.params.id },
      returning: true, // To get the updated record
    });

    if (rowsUpdated === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user
    res.status(200).json(updatedUsers[0]); // Assuming you expect a single user to be updated
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database using Sequelize's findAll method
    const users = await User.findAll();

    // If no users are found, return an appropriate message
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the found users in the response
    res.status(200).json({ users });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  try {
    const { totalBalance, ROI, withdrawal, admin } = req.body;

    let updates = {
      totalBalance,
      ROI,
      withdrawal,
      admin,
    };

    const [rowsUpdated, updatedUsers] = await User.update(updates, {
      where: { id: req.params.id },
      returning: true, // To get the updated record
    });

    if (rowsUpdated === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Return the updated user
    res.status(200).json(updatedUsers[0]); // Assuming you expect a single user to be updated
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id; // Get the user ID from the request params

  try {
    // Find the user by ID using Sequelize's findByPk method
    const user = await User.findByPk(userId);

    // If the user is not found, return an appropriate message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the found user in the response
    res.status(200).json({ user });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  try {
    const user = await User.findByPk(userId); // Find the user by their ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy(); // Delete the user

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     const { firstName, lastName, email, country, phone, password } = req.body;

//     // Assuming 'User' is your Sequelize model for the users table
//     const existingUser = await User.findByPk(req.params.id);

//     if (!existingUser) {
//       return next(errorHandler(404, "User not found"));
//     }

//     // Check if the logged-in user is trying to update their own account
//     if (req.user_id !== req.params.id) {
//       return next(errorHandler(401, "You can only update your own account!"));
//     }

//     if (password) {
//       // Hash the password if it's provided in the request
//       existingUser.password = bcryptjs.hashSync(password, 10);
//     }

//     // Update the user's information
//     existingUser.firstName = firstName;
//     existingUser.lastName = lastName;
//     existingUser.country = country;
//     existingUser.phone = phone;
//     existingUser.email = email;

//     // Save the updated user data
//     await existingUser.save();

//     // Filter out sensitive information before sending the response
//     const { password: pass, ...rest } = existingUser.toJSON();

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
