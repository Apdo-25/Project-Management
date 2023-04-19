const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authController");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);
router.get("/refresh", authControllers.refresh);
router.get("/user", authControllers.user);

module.exports = router;
