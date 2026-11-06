const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TaskFlow API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes); 

// Hamesha sab routes ke baad
app.use(notFound);
app.use(errorHandler);

module.exports = app;