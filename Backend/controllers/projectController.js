const Project = require("../models/Project");
const Board = require("../models/Board");

async function getProjects(req, res) {
  const projects = await Project.find().exec();
  return res.json(projects);
}

async function getProject(req, res) {
  const project = await Project.findById(req.params.id).exec();
  return res.json(project);
}

async function createProject(req, res) {
  const { name, description, tasks } = req.body;
  const project = await Project.create({
    name,
    description,
    tasks,
  });
  return res.json(project);
}

async function updateProject(req, res) {
  const { name, description, tasks } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      tasks,
    },
    { new: true }
  ).exec();
  return res.json(project);
}

async function deleteProject(req, res) {
  try {
    await Project.findByIdAndDelete(req.params.id).exec();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

//add a board to project
async function addBoard(req, res) {
  const { name, tasks } = req.body;
  const project = await Project.findById(req.params.id).exec();
  const board = await Board.create({
    name,
    tasks,
  });
  project.boards.push(board);
  await project.save();
  return res.json(project);
}

async function removeBoard(req, res) {
  const project = await Project.findById(req.params.id).exec();
  project.boards.pull(req.params.boardId);
  await project.save();
  return res.json(project);
}

async function addMember(req, res) {
  const { user_id } = req.body;
  const project = await Project.findById(req.params.id).exec();
  project.members.push(user_id);
  await project.save();
  return res.json(project);
}

async function removeMember(req, res) {
  const project = await Project.findById(req.params.id).exec();
  project.members.pull(req.params.memberId);
  await project.save();
  return res.json(project);
}

//delete all projects
async function deleteAllProjects(req, res) {
  try {
    await Project.deleteMany();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addBoard,
  removeBoard,
  addMember,
  removeMember,
  deleteAllProjects,
};
