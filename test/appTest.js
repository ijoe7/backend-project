import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";

chai.should();
chai.use(chaiHttp);


afterEach((done) => {
	done();
});

let token = "";

describe("Post SignUp requests", () => {
	it("SignUp should be successful with username or password", (done) => {
		request(app)
			.post("/users/signup")
			.send({ username: "name", password: "password" })
			.expect(201)
			.end( (err,res) => {
				res.body.should.have.property("message", "Successfully signed up");
				done();
			});
	});
});


describe("Post login requests", () => {
	it("login should be successful with username or password", (done) => {
		request(app)
			.post("/users/login")
			.send({ username: "name", password: "password" })
			.expect(201)
			.end( (err,res) => {
				res.body.should.have.property("message", "User signed in successfully");
				token = res.body.token;
				done();
			});
	});

});

describe("Post JSON patch requests", () => {
	let jsonObj = { firstName: "Segun", lastName: "David", gender: "male", age: 25, status: "happy" };
	const jsonPatchObj = [{ op: "add", path: "/status", value: { location: "Lagos" } }, { op: "remove", path: "/status" }, { op: "replace", path: "/age", value: 90 }, { op: "copy", from: "/firstName", path: "/lastName" }, { op: "move", from: "/firstName", path: "/gender" }];

	it("JSON Object should be formatted", (done) => {
		request(app)
			.post("/patch")
			.set("authorization", `Bearer ${token}`)
			.send({ jsonObj, jsonPatchObj })
			.expect(201)
			.end((err, res) => {
				res.body.should.have.property("message", "Data Edited");
				res.body.patchedDoc.should.be.a("object");
				done();
			});
	});

});

describe("Post Image uri requests", () => {
	it("Should successful create thumbnail from downloaded picture", (done) => {
		request(app)
			.post("/thumbs")
			.set("authorization", `Bearer ${token}`)
			.send({ uri: "https://cdn.pixabay.com/photo/2020/06/01/10/02/puffin-5246026_960_720.jpg" })
			.expect(200)
			.end((err, res) => {
				res.body.should.have.property("status", "ok");
				res.body.should.have.property("message", "image resized succesfully");
				done();
			});
	});
});