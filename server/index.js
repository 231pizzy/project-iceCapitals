import express from "express";
import { db } from "./src/config/dbConfig.js";
import userRouter from "./src/routes/user.route.js";
import depositRouter from "./src/routes/deposit.route.js";
import withdrawlRouter from "./src/routes/withdrawal.route.js";
import walletRouter from "./src/routes/wallet.route.js";
import cookieParser from "cookie-parser";
import { calculateDaily } from "./src/sheduler.js";
import schedule from "node-schedule";
import path from "path";

let jobScheduled = false; // Flag to track whether the job has been scheduled

// Establish database connection
db.sync()
  .then(() => {
    console.log("Database is connected");
    scheduleDailyJob(); // Schedule the job when the database connection is established
  })
  .catch((err) => {
    console.log(err);
  });

// Function to schedule the calculateDaily function
function scheduleDailyJob() {
  if (!jobScheduled) {
    // Schedule the job only if it hasn't been scheduled before
    const job = schedule.scheduleJob("0 0 * * *", () => {
      console.log("Calculating daily ROI (every 24 hours)...");
      calculateDaily();
      console.log("Daily ROI calculation complete.");
    });

    jobScheduled = true; // Set the flag to true to indicate the job has been scheduled
  }
}
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
