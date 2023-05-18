const express = require("express");
const router = express.Router();
const boardController = require("../../controllers/boardController");

// Boards
router.get("/boards", boardController.getBoards);
router.get("/boards/:id", boardController.getBoard);
router.post("/boards", boardController.createBoard);
router.put("/boards/:id", boardController.updateBoard);
router.delete("/boards/:id", boardController.deleteBoard);

// Tasks
router.get("/boards/:boardId/tasks", boardController.getTasks); // Get tasks within a board
router.post("/boards/:boardId/tasks", boardController.createTask); // Create a task within a board
router.put("/boards/:boardId/tasks/:taskId", boardController.updateTask); // Update a task within a board
router.delete("/boards/:boardId/tasks/:taskId", boardController.deleteTask); // Delete a task within a board

module.exports = router;
