process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;
const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const Board = require("../models/Board");

chai.use(chaiHttp);

//clear db after test
after(async function () {
  try {
    await Project.deleteMany();
  } catch (err) {
    console.error(err);
  }
});

describe("First Test Collection", () => {
  it("should return a message from the default API route", (done) => {
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

describe("Second Test Collection", () => {
  it("should return all projects from the GET route", (done) => {
    chai
      .request(server)
      .get("/api/project/projects")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Third Test Collection", () => {
  it("should create a new project with the POST route", (done) => {
    chai
      .request(server)
      .post("/api/project/projects")
      .send({
        name: "Test Project",
        description: "Test Description",
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Test Project");
        res.body.should.have.property("description").eql("Test Description");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Fourth Test Collection", () => {
  it("should delete a project with the DELETE route", function (done) {
    this.timeout(5000); // increase the timeout to 5 seconds
    const project = new Project({
      name: "Test Project",
      description: "Test Description",
    });
    project
      .save()
      .then((project) => {
        chai
          .request(server)
          .delete("/api/project/projects/" + project.id)
          .then((res) => {
            res.should.have.status(204);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
