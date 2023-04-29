process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;
const Project = require("../models/Project");

chai.use(chaiHttp);

//clear db after test
after(function (done) {
  Project.deleteMany({}, function (err) {
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
      .get("/api/project/projects")
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
      .post("/api/project/projects")
      .send({
        name: "Test Project",
        description: "Test Description",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Test Project");
        res.body.should.have.property("description").eql("Test Description");
        done();
      });
  });
});

describe("/Fourth Test Collection", () => {
  it("test DELETE route...", function () {
    this.timeout(5000); // increase the timeout to 5 seconds
    const project = new Project({
      name: "Test Project",
      description: "Test Description",
    });
    project.save((err, project) => {
      chai
        .request(server)
        .delete("/api/project/projects/" + project.id)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
