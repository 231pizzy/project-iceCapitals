import express from "express";
import {
  deleteDeposit,
  deposite,
  getAllDeposits,
  getSingleDeposit,
  getUserDeposit,
  updateDeposit,
  updateTotalBalance,
} from "../controllers/deposit.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/deposit", verifyToken, deposite);
router.post("/update/:id", verifyToken, updateTotalBalance);
router.get("/get/:id", verifyToken, getUserDeposit);
router.get("/get", verifyToken, getAllDeposits);
router.get("/get-single/:id", verifyToken, getSingleDeposit);
router.post("/admin-update/:id", updateDeposit);
router.delete("/delete/:id", deleteDeposit);
export default router;
