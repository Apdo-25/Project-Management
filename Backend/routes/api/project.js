const express = require("express");
const router = express.Router();
const projectControllers = require("../../controllers/projectController");

//Projects
router.get("/projects", projectControllers.getProjects);
router.get("/projects/:id", projectControllers.getProject);
router.post("/projects", projectControllers.createProject);
router.put("/projects/:id", projectControllers.updateProject);
router.delete("/projects/:id", projectControllers.deleteProject);

module.exports = router;
