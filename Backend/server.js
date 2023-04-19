const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("./middleware/cors");
const app = express();
const Cookie = require("cookie-parser");
const { errorHandler } = require("./middleware/error");
const path = require("path");
const connectDB = require("./config/database");

require("dotenv-flow").config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Cookie());

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the PM REST API HOMEPAGE" });
});

//static fles
app.use("/static", express.static(path.join(__dirname, "public")));

// Mount your API routes
app.use("/api/auth", require("./routes/api/auth"));

//Error Handling Middleware
app.use(errorHandler);

// 404 Handler
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

// Start Server
const PORT = process.env.PORT || 4000;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
