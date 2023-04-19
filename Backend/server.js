require("dotenv-flow").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/error-handler");
const path = require("path");
const connectDB = require("./config/database");
const corsOptions = require("./config/cors");

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsOptions);

// Root
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the PM REST API HOMEPAGE" });
});

//static fles
app.use("/static", express.static(path.join(__dirname, "public")));

//Error Handling Middleware
app.use(errorHandler);

// Mount your API routes
app.use("/api/auth", require("./routes/api/auth"));

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
  console.log("DB Connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
