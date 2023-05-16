const Task = require("../models/Task");
const Board = require("../models/Board");

async function getTasks(req, res) {
  const tasks = await Task.find().exec();
  return res.json(tasks);
}

async function getTask(req, res) {
  const task = await Task.findById(req.params.id).exec();
  return res.json(task);
}

async function createTask(req, res) {
  const { name, description, project, status } = req.body;
  const task = await Task.create({
    name,
    description,
    project,
    status,
  });
  return res.json(task);
}

async function updateTask(req, res) {
  const { name, description, project, status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      project,
      status,
    },
    { new: true }
  ).exec();
  return res.json(task);
}

async function deleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.id).exec();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

//delete all tasks
async function deleteAllTasks(req, res) {
  try {
    await Task.deleteMany().exec();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
