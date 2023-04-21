const allowedOrigins = require("./allowed_origins");

const corsOptions = (req, res) => {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  };
};

module.exports = corsOptions;
