// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const expect = chai.expect;
// const Project = require("../models/Project");
// const Board = require("../models/Board");
// const Task = require("../models/Task");

// //env testdb
// process.env.NODE_ENV = "test";

// chai.use(chaiHttp);

// describe("Project Controller", () => {
//   beforeEach(async () => {
//     // Clear the database before each test
//     await Project.deleteMany();
//     await Board.deleteMany();
//     await Task.deleteMany();
//   });

//   describe("POST /api/project/projects", () => {
//     it("should create a new project", async () => {
//       const response = await chai
//         .request(server)
//         .post("/api/project/projects")
//         .send({
//           name: "Xaar Project",
//           description: "Test Description",
//         });

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("object");
//       expect(response.body).to.have.property("name", "Test Project");
//       expect(response.body).to.have.property("description", "Test Description");
//     });
//   });

//   describe("GET /api/project/projects", () => {
//     it("should get all projects", async () => {
//       // Create test projects
//       const project1 = new Project({
//         name: "Project 1",
//         description: "Description 1",
//       });
//       await project1.save();

//       const project2 = new Project({
//         name: "Project 2",
//         description: "Description 2",
//       });
//       await project2.save();

//       const response = await chai.request(server).get("/api/project/projects");

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("array");
//       expect(response.body).to.have.lengthOf(2);

//       const projectNames = response.body.map((project) => project.name);
//       expect(projectNames).to.include.members(["Project 1", "Project 2"]);
//     });
//   });

//   describe("DELETE /api/project/projects/:id", () => {
//     it("should delete a project", async () => {
//       // Create a test project
//       const project = new Project({
//         name: "Test Project",
//         description: "Test Description",
//       });
//       await project.save();

//       const response = await chai
//         .request(server)
//         .delete(`/api/project/projects/${project._id}`);

//       expect(response).to.have.status(204);

//       // Check if the project is deleted from the database
//       const deletedProject = await Project.findById(project._id);
//       expect(deletedProject).to.be.null;
//     });

//     it("should delete associated boards and tasks", async () => {
//       // Create a test project with associated boards and tasks
//       const project = new Project({
//         name: "Test Project",
//         description: "Test Description",
//       });
//       await project.save();

//       const board1 = new Board({
//         name: "Board 1",
//         project: project._id,
//       });
//       await board1.save();

//       const board2 = new Board({
//         name: "Board 2",
//         project: project._id,
//       });
//       await board2.save();

//       const task1 = new Task({
//         name: "Task 1",
//         board: board1._id,
//         project: project._id,
//       });
//       await task1.save();

//       const task2 = new Task({
//         name: "Task 2",
//         board: board2._id,
//         project: project._id,
//       });
//       await task2.save();

//       const response = await chai
//         .request(server)
//         .delete(`/api/project/projects/${project._id}`);

//       expect(response).to.have.status(204);

//       // Check if the project, boards, and tasks are deleted from the database
//       const deletedProject = await Project.findById(project._id);
//       const deletedBoard1 = await Board.findById(board1._id);
//       const deletedBoard2 = await Board.findById(board2._id);
//       const deletedTask1 = await Task.findById(task1._id);
//       const deletedTask2 = await Task.findById(task2._id);

//       expect(deletedProject).to.be.null;
//       expect(deletedBoard1).to.be.null;
//       expect(deletedBoard2).to.be.null;
//       expect(deletedTask1).to.be.null;
//       expect(deletedTask2).to.be.null;
//     });
//   });
// });
