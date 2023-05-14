const Project = require("../models/Project");
const Board = require("../models/Board");
const Joi = require("joi");

async function getProjects(req, res) {
  try {
    // Pagination options
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find().skip(skip).limit(limit).exec();

    const totalProjects = await Project.countDocuments().exec();

    return res.json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id).exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createProject(req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      tasks: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, description, tasks } = req.body;
    const project = await Project.create({
      name,
      description,
      tasks,
    });
    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProject(req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      tasks: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id).exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addBoard(req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      tasks: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, tasks } = req.body;
    const project = await Project.findById(req.params.id).exec();
    const board = await Board.create({
      name,
      tasks,
    });
    project.boards.push(board);
    await project.save();
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeBoard(req, res) {
  try {
    const project = await Project.findById(req.params.id).exec();
    project.boards.pull(req.params.boardId);
    await project.save();
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addMember(req, res) {
  try {
    const { user_id } = req.body;
    const project = await Project.findById(req.params.id).exec();
    project.members.push(user_id);
    await project.save();
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeMember(req, res) {
  try {
    const project = await Project.findById(req.params.id).exec();
    project.members.pull(req.params.memberId);
    await project.save();
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteAllProjects(req, res) {
  try {
    await Project.deleteMany();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
