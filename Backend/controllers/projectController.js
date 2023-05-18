const Project = require("../models/Project");
const Board = require("../models/Board");
const Task = require("../models/Task");

async function createProject(req, res) {
  const { name, description, status, members, priority, deadline } = req.body;

  let project;
  try {
    project = await Project.create({
      name,
      description,
      // If status is not provided, set it to "New"
      status: status || "new",
      members,
      priority,
      deadline,
    });
  } catch (error) {
    console.error("Error creating project: ", error);
    return res.status(500).json({ error: "Failed to create project." });
  }

  try {
    return res.json(project);
  } catch (error) {
    console.error("Error returning project: ", error);
    return res.status(500).json({ error: "Failed to return project." });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().exec();
    return res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch projects." });
  }
}

async function getUserProjects(req, res) {
  const { userId } = req.params; // Extract the user ID from the request parameters

  try {
    // Filter the projects so only those where the user is a member are returned
    const projects = await Project.find({ members: userId }).exec();
    return res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user's projects." });
  }
}

async function getMemberProjects(req, res) {
  const { userId } = req.params; // Extract the user ID from the request parameters
  const { projectId } = req.query; // Extract the project ID from the request query parameters
  try {
    // Filter the projects so only those where the user is a member are returned
    const projects = await Project.find({
      members: userId,
      _id: { $ne: projectId }, // Exclude the current project
    }).exec();
    return res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user's projects." });
  }
}

async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id)
      .populate({
        path: "boards",
        populate: { path: "tasks" },
      })
      .exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch project." });
  }
}

async function updateProject(req, res) {
  try {
    const { name } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    ).exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update project." });
  }
}

async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id).exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    // Delete associated boards and their tasks
    await Board.deleteMany({ _id: { $in: project.boards } }).exec();
    await Task.deleteMany({ project: project._id }).exec();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete project." });
  }
}

// Add a board to a project
async function addBoard(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Create the board using the provided information
    const board = await Board.create({ name, project: project._id });

    // Add the board to the project's boards array
    project.boards.push(board._id);
    await project.save();

    return res.status(201).json(board);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add board to project." });
  }
}

// Remove a board from a project
async function removeBoard(req, res) {
  try {
    const { id, boardId } = req.params;

    // Find the project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Check if the board exists in the project's boards array
    const boardIndex = project.boards.indexOf(boardId);
    if (boardIndex === -1) {
      return res.status(404).json({ error: "Board not found in project." });
    }

    // Remove the board from the project's boards array
    project.boards.splice(boardIndex, 1);
    await project.save();

    // Delete the board and its associated tasks
    await Board.findByIdAndDelete(boardId).exec();
    await Task.deleteMany({ board: boardId }).exec();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to remove board from project." });
  }
}

// Add a member to a project
async function addMember(req, res) {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    // Find the project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Check if the member already exists in the project's members array
    const memberIndex = project.members.indexOf(memberId);
    if (memberIndex !== -1) {
      return res
        .status(400)
        .json({ error: "Member already exists in project." });
    }

    // Add the member to the project's members array
    project.members.push(memberId);
    await project.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add member to project." });
  }
}

// Remove a member from a project
async function removeMember(req, res) {
  try {
    const { id, memberId } = req.params;

    // Find the project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Check if the member exists in the project's members array
    const memberIndex = project.members.indexOf(memberId);
    if (memberIndex === -1) {
      return res.status(404).json({ error: "Member not found in project." });
    }

    // Remove the member from the project's members array
    project.members.splice(memberIndex, 1);
    await project.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to remove member from project." });
  }
}

// Delete all projects
async function deleteAllProjects(req, res) {
  try {
    await Project.deleteMany({}).exec();
    await Board.deleteMany({}).exec();
    await Task.deleteMany({}).exec();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete all projects." });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getUserProjects,
  getMemberProjects,
  getProject,
  updateProject,
  deleteProject,
  addBoard,
  removeBoard,
  addMember,
  removeMember,
  deleteAllProjects,
};
