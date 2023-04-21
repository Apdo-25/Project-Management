function auth(req, res, next) {
  if (req.user?.id) return next();
  res.status(401).send("You are not authorized to access this resource");

  next();
}

module.exports = auth;
