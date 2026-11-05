const jwt = require("jsonwebtoken");

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = () => ({
  httpOnly: true,                        // JS cookie nahi padh sakti
  secure: isProd,                        // production mein sirf HTTPS
  sameSite: isProd ? "none" : "lax",     // deployed frontend/backend alag domains par hon to "none"
});

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token, {
    ...cookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
  });
};

module.exports = { generateToken, cookieOptions };