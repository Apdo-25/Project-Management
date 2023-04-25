const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authController");
const projectControllers = require("../../controllers/projectController");
const taskControllers = require("../../controllers/taskController");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.post("/refresh", authControllers.refresh);
router.get("/user", authControllers.user);

//Projects
router.get("/projects", projectControllers.getProjects);
router.get("/projects/:id", projectControllers.getProject);
router.post("/projects", projectControllers.createProject);
router.put("/projects/:id", projectControllers.updateProject);
router.delete("/projects/:id", projectControllers.deleteProject);

//Tasks
router.get("/tasks", taskControllers.getTasks);
router.get("/tasks/:id", taskControllers.getTask);
router.post("/tasks", taskControllers.createTask);
router.put("/tasks/:id", taskControllers.updateTask);
router.delete("/tasks/:id", taskControllers.deleteTask);

module.exports = router;
