// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const expect = chai.expect;
// const Project = require("../models/Project");
// const Board = require("../models/Board");
// const Task = require("../models/Task");

// // Set the environment to test
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
//         .post("/api/project")
//         .send({
//           name: "Test Project",
//           description: "This is a test project",
//           status: "new",
//           members: ["member1", "member2"],
//           priority: "high",
//           deadline: new Date("2023-05-31"),
//         });

//       expect(response).to.have.status(200);
//       expect(response.body).to.have.property("name", "Test Project");
//       expect(response.body).to.have.property(
//         "description",
//         "This is a test project"
//       );
//       expect(response.body).to.have.property("status", "new");
//       expect(response.body)
//         .to.have.property("members")
//         .to.deep.equal(["member1", "member2"]);
//       expect(response.body).to.have.property("priority", "high");
//       expect(response.body).to.have.property("deadline");
//       expect(response.body).to.have.property("createdBy");
//       expect(response.body).to.have.property("boards").to.be.an("array");
//     });

//     // Add more test cases for error handling and edge cases
//   });

//   describe("GET /api/project/projects", () => {
//     it("should fetch all projects", async () => {
//       // Create sample projects in the database
//       await Project.create({
//         name: "Project 1",
//         description: "Project 1 description",
//         status: "new",
//         members: ["member1"],
//         priority: "high",
//         deadline: new Date("2023-05-31"),
//       });
//       await Project.create({
//         name: "Project 2",
//         description: "Project 2 description",
//         status: "in-progress",
//         members: ["member2"],
//         priority: "medium",
//         deadline: new Date("2023-06-15"),
//       });

//       const response = await chai.request(server).get("/api/project");

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("array");
//       expect(response.body.length).to.equal(2);
//     });

//     // Add more test cases for error handling and edge cases
//   });

//   // Add more test cases for other controller functions
// });
