const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

    // Galat ID format
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }
  // Duplicate email
  if (err.code === 11000) {
    statusCode = 400;
    message = "This email is already registered";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }

  // JWT error
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Not authorized, token failed";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };