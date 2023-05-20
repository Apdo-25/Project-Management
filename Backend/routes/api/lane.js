const express = require("express");
const router = express.Router();
const laneController = require("../../controllers/laneController");

// Lanes
router.get("/lanes", laneController.getAllLanes);
router.get("/lanes/:id", laneController.getLane);
router.post("/lanes", laneController.createLane);
router.put("/lanes/:id", laneController.updateLane);
router.delete("/lanes/:id", laneController.deleteLane);

// Tasks add and remove
router.post("/lanes/:id/tasks", laneController.addTask);
router.delete("/lanes/:id/tasks/:taskId", laneController.removeTask);

module.exports = router;
