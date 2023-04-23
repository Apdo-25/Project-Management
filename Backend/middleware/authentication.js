const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authentication(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
  }

  next();
}

module.exports = authentication;
