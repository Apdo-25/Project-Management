// process.env.NODE_ENV = "test";

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server");
// const should = chai.should();
// const expect = chai.expect;
// const User = require("../models/User");
// const authController = require("../controllers/authController");

// chai.use(chaiHttp);

// describe("/First Test Collection", () => {
//   it("test default API route...", (done) => {
//     chai
//       .request(server)
//       .get("/")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("message").eql("Hello World!");
//         done();
//       });
//   });
// });

// describe("/Second Test Collection", () => {
//   it("test GET route...", (done) => {
//     chai
//       .request(server)
//       .get("/api/user/users")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         done();
//       });
//   });
// });

// // test register route from authControllers
// describe("/Third Test Collection", () => {
//   it("test POST route...", (done) => {
//     chai
//       .request(server)
//       .post("/api/auth/register")
//       .send({
//         email: "",
//         password: "",
//       })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });
