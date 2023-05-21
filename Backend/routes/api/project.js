const express = require("express");
const router = express.Router();
const projectControllers = require("../../controllers/projectController");

//Projects
router.get("/projects", projectControllers.getAllProjects);
router.get("/projects/user/:userId", projectControllers.getUserProjects);
router.get("/projects/member/:userId", projectControllers.getMemberProjects);
router.get("/projects/:id", projectControllers.getProject);
router.post("/projects", projectControllers.createProject);
router.put("/projects/:id", projectControllers.updateProject);
router.get(
  "/projects/closeDueDates",
  projectControllers.getProjectsCloseDueDates
);
router.delete("/projects/:id", projectControllers.deleteProject);

//Tasks
router.post("/projects/:id/boards", projectControllers.addBoard);
router.delete("/projects/:id/boards/:boardId", projectControllers.removeBoard);

//Members
router.post("/projects/:id/members", projectControllers.addMember);
router.delete(
  "/projects/:id/members/:memberId",
  projectControllers.removeMember
);

router.delete("/projects", projectControllers.deleteAllProjects);

module.exports = router;
