import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

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

// All Routes Import

// Api  EndPoints
app.get("/api/v1/test", (req, res) => {
  res.json({ app: "hi From the test api" });
});
// --error Middlewares

// Handling Uncaught Exception

// DB Config

// --------------------------deployment------------------------------

// Listener
app.listen(PORT, () =>
  console.log(
    `Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port- ${chalk.blue.bold(PORT)}`
  )
);

// Unhandled Promise Rejection
