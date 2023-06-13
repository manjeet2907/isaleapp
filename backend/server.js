import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import connectionToDB from "./config/db.js";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/apiLimiter.js";
// app configs goes here

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware goes here
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --to accept data from Server
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());
//-- custom logger for production
app.use(morganMiddleware);

// All Routes Import
import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import documentRoutes from "./routes/documentRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// Api  EndPoints
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/user", apiLimiter, userRoutes);
// app.use("/api/v1/customer", apiLimiter, customerRoutes);
// app.use("/api/v1/document", apiLimiter, documentRoutes);
// app.use("/api/v1/upload", apiLimiter, uploadRoutes);

app.get("/api/v1/test", (req, res) => {
  res.json({ app: "hi From the test api" });
});
/**
 ** this is test route

 */

// --error Middlewares
app.use(notFound);
app.use(errorHandler);

// Handling Uncaught Exception

// DB Config
await connectionToDB();
// --------------------------deployment------------------------------

// Listener
app.listen(PORT, () => {
  console.log(
    `Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port- ${chalk.blue.bold(PORT)}`
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Unhandled Promise Rejection
