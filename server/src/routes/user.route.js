import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  signOut,
  signin,
  signup,
  updateUser,
  updateUserByAdmin,
} from "../controllers/users.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/update/:id", verifyToken, updateUser);
router.get("/get", verifyToken, getAllUsers);
router.get("/get/:id", verifyToken, getUserById);
router.post("/admin-update/:id", updateUserByAdmin);
router.delete("/delete/:id", deleteUser);

export default router;
