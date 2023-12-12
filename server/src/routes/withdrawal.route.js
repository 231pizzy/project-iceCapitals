import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  adminUpdateWithdrawal,
  deleteWithdrawal,
  getAllWithdrawals,
  getSingleWithdrawal,
  getUserwithdrawals,
  updateWithdrawal,
  withdrawal,
} from "../controllers/withdrawal.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, withdrawal);
router.post("/update/:id", verifyToken, updateWithdrawal);
router.get("/get/:id", verifyToken, getUserwithdrawals);
router.get("/get", verifyToken, getAllWithdrawals);
router.get("/get-single/:id", verifyToken, getSingleWithdrawal);
router.post("/admin-update/:id", adminUpdateWithdrawal);
router.delete("/delete/:id", deleteWithdrawal);

export default router;
