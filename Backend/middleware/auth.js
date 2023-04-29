const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Missing or invalid token." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res
      .status(401)
      .json({ error: "Unauthorized", message: "Invalid or expired token." });
  }
}

module.exports = auth;
