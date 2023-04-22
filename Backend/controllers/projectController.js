const Project = require("../models/project");

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
  await Project.findByIdAndDelete(req.params.id).exec();
  return res.sendStatus(204);
}

async function addTask(req, res) {
  const { name, description, due_date, priority, status } = req.body;
  const project = await Project.findById(req.params.id).exec();
  project.tasks.push({
    name,
    description,
    due_date,
    priority,
    status,
  });
  await project.save();
  return res.json(project);
}

async function removeTask(req, res) {
  const project = await Project.findById(req.params.id).exec();
  project.tasks.pull(req.params.taskId);
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

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addTask,
  removeTask,
  addMember,
  removeMember,
};
