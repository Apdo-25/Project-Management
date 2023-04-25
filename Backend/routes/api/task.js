const express = require("express");
const router = express.Router();
const taskControllers = require("../../controllers/taskController");

//Tasks
router.get("/tasks", taskControllers.getTasks);
router.get("/tasks/:id", taskControllers.getTask);
router.post("/tasks", taskControllers.createTask);
router.put("/tasks/:id", taskControllers.updateTask);
router.delete("/tasks/:id", taskControllers.deleteTask);

module.exports = router;
