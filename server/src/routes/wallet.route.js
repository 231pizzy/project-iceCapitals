import express from "express";
import {
  createWallet,
  getAllWallets,
  getSingleWallet,
  updateWallet,
} from "../controllers/wallet.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", createWallet);
router.get("/get", verifyToken, getAllWallets);
router.get("/get-single/:id", verifyToken, getSingleWallet);
router.post("/admin-update/:id", updateWallet);

export default router;
