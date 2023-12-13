import express from "express";
import { db } from "./src/config/dbConfig.js";
import userRouter from "./src/routes/user.route.js";
import depositRouter from "./src/routes/deposit.route.js";
import withdrawlRouter from "./src/routes/withdrawal.route.js";
import walletRouter from "./src/routes/wallet.route.js";
import cookieParser from "cookie-parser";
import { calculateDaily } from "./src/sheduler.js";
import path from "path";

db.sync()
  .then(() => {
    console.log("Database is connected");
    calculateDaily();
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use("/api/user", userRouter);
app.use("/api/deposit", depositRouter);
app.use("/api/withdrawal", withdrawlRouter);
app.use("/api/wallet", walletRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
