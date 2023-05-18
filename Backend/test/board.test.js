// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const expect = chai.expect;
// const Board = require("../models/Board");

// //env testdb
// process.env.NODE_ENV = "test";

// chai.use(chaiHttp);

// describe("Board Controller", () => {
//   beforeEach(async () => {
//     // Clear the database before each test
//     await Board.deleteMany();
//   });

//   describe("GET /api/board/boards", () => {
//     it("should get all boards", async () => {
//       // Create test boards
//       const board1 = new Board({
//         name: "Board 1",
//         description: "Description 1",
//       });
//       await board1.save();

//       const board2 = new Board({
//         name: "Board 2",
//         description: "Description 2",
//       });
//       await board2.save();

//       const response = await chai.request(server).get("/api/board/boards");

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("array");
//       expect(response.body).to.have.lengthOf(2);

//       const boardNames = response.body.map((board) => board.name);
//       expect(boardNames).to.include.members(["Board 1", "Board 2"]);
//     });
//   });

//   describe("GET /api/board/boards/:id", () => {
//     it("should get a single board", async () => {
//       // Create a test board
//       const board = new Board({
//         name: "Test Board",
//         description: "Test Description",
//       });
//       await board.save();

//       const response = await chai
//         .request(server)
//         .get(`/api/board/boards/${board._id}`);

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("object");
//       expect(response.body).to.have.property("name", "Test Board");
//       expect(response.body).to.have.property("description", "Test Description");
//     });

//     it("should return error if board is not found", async () => {
//       const response = await chai
//         .request(server)
//         .get("/api/board/boards/1234567890");

//       expect(response).to.have.status(404);
//       expect(response.body).to.have.property("error", "Board not found.");
//     });
//   });

//   describe("POST /api/board/boards", () => {
//     it("should create a new board", async () => {
//       const response = await chai
//         .request(server)
//         .post("/api/board/boards")
//         .send({
//           name: "Xaar Board",
//           description: "Test Description",
//         });

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("object");
//       expect(response.body).to.have.property("name", "Test Board");
//       expect(response.body).to.have.property("description", "Test Description");
//     });
//   });

//   describe("PUT /api/board/boards/:id", () => {
//     it("should update a board", async () => {
//       // Create a test board
//       const board = new Board({
//         name: "Test Board",
//         description: "Test Description",
//       });
//       await board.save();

//       const response = await chai
//         .request(server)
//         .put(`/api/board/boards/${board._id}`)
//         .send({ name: "Updated Board", description: "Updated Description" });

//       expect(response).to.have.status(200);
//       expect(response.body).to.be.an("object");
//       expect(response.body).to.have.property("name", "Updated Board");
//       expect(response.body).to.have.property(
//         "description",
//         "Updated Description"
//       );
//     });

//     it("should return error if board is not found", async () => {
//       const response = await chai
//         .request(server)
//         .put("/api/board/boards/1234567890")
//         .send({ name: "Updated Board" });

//       expect(response).to.have.status(404);
//       expect(response.body).to.have.property("error", "Board not found.");
//     });
//   });

//   describe("DELETE /api/board/boards/:id", () => {
//     it("should delete a board", async () => {
//       // Create a test board
//       const board = new Board({
//         name: "Test Board",
//         description: "Test Description",
//       });
//       await board.save();

//       const response = await chai
//         .request(server)
//         .delete(`/api/board/boards/${board._id}`);

//       expect(response).to.have.status(204);

//       // Check if the board is deleted from the database
//       const deletedBoard = await Board.findById(board._id);
//       expect(deletedBoard).to.be.null;
//     });

//     it("should return error if board is not found", async () => {
//       const response = await chai
//         .request(server)
//         .delete("/api/board/boards/1234567890");

//       expect(response).to.have.status(404);
//       expect(response.body).to.have.property("error", "Board not found.");
//     });
//   });

//   describe("DELETE /api/board/boards", () => {
//     it("should delete all boards", async () => {
//       // Create test boards
//       const board1 = new Board({
//         name: "Board 1",
//         description: "Description 1",
//       });
//       await board1.save();

//       const board2 = new Board({
//         name: "Board 2",
//         description: "Description 2",
//       });
//       await board2.save();

//       const response = await chai.request(server).delete("/api/board/boards");

//       expect(response).to.have.status(204);

//       // Check if all boards are deleted from the database
//       const deletedBoards = await Board.find();
//       expect(deletedBoards).to.have.lengthOf(0);
//     });
//   });
// });
