// process.env.NODE_ENV = "test";

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const should = chai.should();
// const expect = chai.expect;
// const Project = require("../models/Task");

// chai.use(chaiHttp);

// describe("/First Test Collection", () => {
//     it("test default API route...", (done) => {
//         chai
//         .request(server)
//         .get("/")
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("message").eql("Hello World!");
//             done();
//         });
//     });
//     }
// });

// describe("/Second Test Collection", () => {
//     it("test GET route...", (done) => {
//         chai
//         .request(server)
//         .get("/api/task/tasks")
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("array");
//             done();
//         });
//     });
// });

// describe("/Third Test Collection", () => {
//     it("test POST route...", (done) => {
//         chai
//         .request(server)
//         .post("/api/task/tasks")
//         .send({
//             name: "Test Task",
//             description: "Test Description",
//         })
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("name").eql("Test Task");
//             res.body.should.have.property("description").eql("Test Description");
//             done();
//         });
//     });
// });

// describe("/Fourth Test Collection", () => {
//     it("test DELETE route...", (done) => {
//         const task = new Task({
//             name: "Test Task",
//             description: "Test Description",
//         });
//         task.save((err, task) => {
//             chai
//             .request(server)
//             .delete("/api/task/tasks/" + task.id)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a("object");
//                 done();
//             });
//         });
//     });
// });

// describe("/Fifth Test Collection", () => {
//     it("test PUT route...", (done) => {
//         const task = new Task({
//             name: "Test Task",
//             description: "Test Description",
//         });
//         task.save((err, task) => {
//             chai
//             .request(server)
//             .put("/api/task/tasks/" + task.id)
//             .send({
//                 name: "Test Task",
//                 description: "Test Description",
//             })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a("object");
//                 done();
//             });
//         });
//     });
// });

// describe("/Sixth Test Collection", () => {
//     it("test GET by ID route...", (done) => {
//         const task = new Task({
//             name: "Test Task",
//             description: "Test Description",
//         });
//         task.save((err, task) => {
//             chai
//             .request(server)
//             .get("/api/task/tasks/" + task.id)
//             .send(task)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a("object");
//                 done();
//             });
//         });
//     });
// });
