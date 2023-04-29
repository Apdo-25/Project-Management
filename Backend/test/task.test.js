process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;
const Task = require("../models/Task");

chai.use(chaiHttp);

//clear db after test
after(function (done) {
  Task.deleteMany({}, function (err) {
    if (err) return done(err);
    done();
  });
});

describe("/First Test Collection", () => {
  it("test default API route...", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Hello World!");
        done();
      });
  });
});

describe("/Second Test Collection", () => {
  it("test GET route...", (done) => {
    chai
      .request(server)
      .get("/api/task/tasks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/Third Test Collection", () => {
  it("test POST route...", (done) => {
    chai
      .request(server)
      .post("/api/task/tasks")
      .send({
        name: "Test Task",
        description: "Test Description",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Test Task");
        res.body.should.have.property("description").eql("Test Description");
        done();
      });
  });
});

describe("/Fourth Test Collection", function () {
  it("test DELETE route...", async function () {
    this.timeout(10000); // increase the timeout to 5 seconds
    const task = new Task({
      name: "Test Task",
      description: "Test Description",
    });
    await task.save();
    const res = await chai.request(server).delete("/api/task/tasks/" + task.id);
    res.should.have.status(204);
    res.body.should.be.a("object");
  });
});

describe("/Fifth Test Collection", function () {
  it("test PUT route...", async function () {
    this.timeout(20000); // increase the timeout to 10 seconds
    const task = new Task({
      name: "Test Task",
      description: "Test Description",
    });
    await task.save();
    const res = await chai
      .request(server)
      .put("/api/task/tasks/" + task.id)
      .send({
        name: "Test Task Updated",
        description: "Test Description Updated",
      });
    res.should.have.status(200);
    res.body.should.be.a("object");
  });
});

describe("/Sixth Test Collection", function () {
  it("test GET by ID route...", async function () {
    this.timeout(10000); // increase the timeout to 5 seconds
    const task = new Task({
      name: "Test Task",
      description: "Test Description",
    });
    await task.save();
    const res = await chai
      .request(server)
      .get("/api/task/tasks/" + task.id)
      .send(task);
    res.should.have.status(200);
    res.body.should.be.a("object");
  });
});
