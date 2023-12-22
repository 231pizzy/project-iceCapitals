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
import fs from "fs";

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
      // Read the last run timestamp from the file
      const lastRun = readLastRunTimestamp();

      // Get the current date
      const currentDate = new Date();

      // Check if the scheduler has already run today
      if (!isSameDay(lastRun, currentDate)) {
        console.log("Calculating daily ROI (every 24 hours)...");
        calculateDaily();
        console.log("Daily ROI calculation complete.");

        // Update the last run timestamp in the file
        writeLastRunTimestamp(currentDate);
      } else {
        console.log("Scheduler already ran today. Skipping...");
      }
    });

    jobScheduled = true; // Set the flag to true to indicate the job has been scheduled
  }
}

// Function to check if two dates are on the same day
function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

// Function to read the last run timestamp from a file
function readLastRunTimestamp() {
  try {
    const timestamp = fs.readFileSync("lastRunTimestamp.txt", "utf8");
    return new Date(Number(timestamp));
  } catch (err) {
    return new Date(0); // Return epoch time if file doesn't exist or cannot be read
  }
}

// Function to write the last run timestamp to a file
function writeLastRunTimestamp(timestamp) {
  fs.writeFileSync(
    "lastRunTimestamp.txt",
    timestamp.getTime().toString(),
    "utf8"
  );
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
