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
import User from "./src/models/users.js";

// Establish database connection
db.sync()
  .then(() => {
    console.log("Database is connected");
    scheduleDailyJob(); // Schedule the job when the database connection is established
  })
  .catch((err) => {
    console.log(err);
  });

async function readLastRunTimestamp() {
  try {
    // const lastUser = await User.findOne().sort({ updatedAt: -1 }); // Find the latest updated user
    const lastUser = await User.findOne({}, {}, { sort: { updatedAt: -1 } });
    return lastUser ? lastUser.updatedAt : new Date(0);
  } catch (err) {
    return new Date(0); // Return epoch time if data cannot be retrieved
  }
}

// Function to start the daily ROI calculation using node-cron
function scheduleDailyJob() {
  schedule.scheduleJob("0 0 * * *", async () => {
    const lastRun = await readLastRunTimestamp(); // Read the last run timestamp from UserModel
    console.log(lastRun);
    const currentDate = new Date(); // Get the current date
    console.log(currentDate);
    const isSameDayAsLastRun = isSameDay(lastRun, currentDate); // Check if the current day matches last run day

    if (!isSameDayAsLastRun) {
      try {
        console.log("Calculating daily ROI (every 24 hours)...");
        await calculateDaily(); // Perform ROI calculation for the day
        console.log("Daily ROI calculation complete.");
      } catch (error) {
        console.error("Error calculating daily ROI:", error);
      }
    } else {
      console.log("Scheduler already ran today. Skipping...");
    }
  });
}

// Function to check if two dates are on the same day
function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
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

// function scheduleDailyJob() {
//   if (!jobScheduled) {
//     const job = schedule.scheduleJob("0 0 * * *", async () => {
//       console.log("Calculating daily ROI (every 24 hours)...");
//       const lastRun = readLastRunTimestamp();
//       const currentDate = new Date();

//       if (!isSameDay(lastRun, currentDate)) {
//         try {
//           await calculateDaily();
//           writeLastRunTimestamp(currentDate);
//           console.log("Daily ROI calculation complete.");
//         } catch (error) {
//           console.error("Error calculating daily ROI:", error);
//         }
//       } else {
//         console.log("Scheduler already ran today. Skipping...");
//       }
//     });

//     jobScheduled = true; // Set the flag to true to indicate the job has been scheduled
//   }
// }
