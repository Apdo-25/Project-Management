// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const expect = chai.expect;
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// //env testdb
// process.env.NODE_ENV = "test";

// chai.use(chaiHttp);

// describe("User Controller", () => {
//   beforeEach(async () => {
//     // Clear the database before each test
//     await User.deleteMany();
//   });

//   describe("POST /api/user/register", () => {
//     it("should register a new user", async () => {
//       const response = await chai
//         .request(server)
//         .post("/api/user/register")
//         .send({
//           username: "testuser",
//           email: "apdo@example.com",
//           first_name: "John",
//           last_name: "Doe",
//           password: "password",
//           password_confirm: "password",
//         });

//       expect(response).to.have.status(201);

//       const user = await User.findOne({ email: "test@example.com" });
//       expect(user).to.exist;
//       expect(user).to.have.property("username", "testuser");
//       expect(user).to.have.property("first_name", "John");
//       expect(user).to.have.property("last_name", "Doe");

//       const passwordMatch = await bcrypt.compare("password", user.password);
//       expect(passwordMatch).to.be.true;
//     });

//     it("should return an error for invalid fields", async () => {
//       const response = await chai
//         .request(server)
//         .post("/api/user/register")
//         .send({
//           username: "testuser",
//           email: "test@example.com",
//           first_name: "John",
//           // Missing last_name field
//           password: "password",
//           password_confirm: "password",
//         });

//       expect(response).to.have.status(422);
//       expect(response.body).to.have.property("message", "Invalid fields");
//     });

//     it("should return an error if passwords do not match", async () => {
//       const response = await chai
//         .request(server)
//         .post("/api/user/register")
//         .send({
//           username: "testuser",
//           email: "test@example.com",
//           first_name: "John",
//           last_name: "Doe",
//           password: "password",
//           password_confirm: "differentpassword",
//         });

//       expect(response).to.have.status(422);
//       expect(response.body).to.have.property(
//         "message",
//         "Passwords do not match"
//       );
//     });

//     it("should return an error if user with same email already exists", async () => {
//       // Create a user with the same email
//       await User.create({
//         username: "existinguser",
//         email: "test@example.com",
//         first_name: "Jane",
//         last_name: "Smith",
//         password: await bcrypt.hash("existingpassword", 10),
//       });

//       const response = await chai
//         .request(server)
//         .post("/api/user/register")
//         .send({
//           username: "testuser",
//           email: "test@example.com",
//           first_name: "John",
//           last_name: "Doe",
//           password: "password",
//           password_confirm: "password",
//         });

//       expect(response).to.have.status(409);
//     });
//   });

//   describe("POST /api/user/login", () => {
//     it("should login with correct credentials", async () => {
//       // Create a user
//       await User.create({
//         username: "testuser",
//         email: "test@example.com",
//         first_name: "John",
//         last_name: "Doe",
//         password: await bcrypt.hash("password", 10),
//       });

//       const response = await chai.request(server).post("/api/user/login").send({
//         email: "test@example.com",
//         password: "password",
//       });

//       expect(response).to.have.status(200);
//       expect(response.body).to.have.property("access_token");
//     });

//     it("should return an error for missing credentials", async () => {
//       const response = await chai.request(server).post("/api/user/login").send({
//         // Missing email and password fields
//       });

//       expect(response).to.have.status(422);
//       expect(response.body).to.have.property("message", "Invalid fields");
//     });

//     it("should return an error for incorrect email", async () => {
//       const response = await chai.request(server).post("/api/user/login").send({
//         email: "nonexistent@example.com",
//         password: "password",
//       });

//       expect(response).to.have.status(401);
//       expect(response.body).to.have.property(
//         "message",
//         "Email or password is incorrect"
//       );
//     });

//     it("should return an error for incorrect password", async () => {
//       // Create a user
//       await User.create({
//         username: "testuser",
//         email: "test@example.com",
//         first_name: "John",
//         last_name: "Doe",
//         password: await bcrypt.hash("password", 10),
//       });

//       const response = await chai.request(server).post("/api/user/login").send({
//         email: "test@example.com",
//         password: "incorrectpassword",
//       });

//       expect(response).to.have.status(401);
//       expect(response.body).to.have.property(
//         "message",
//         "Email or password is incorrect"
//       );
//     });
//   });

//   // Add more test cases for other user controller functions here
// });
