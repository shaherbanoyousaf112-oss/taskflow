const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(helmet());                                   // security headers
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());                             // JSON body parse karna
app.use(cookieParser());
app.use(morgan("dev"));                              // request logs

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TaskFlow API is running" });
});

module.exports = app;