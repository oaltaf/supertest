import supertest from "supertest";
import { expect } from "chai";

//general URL of the site which needs to be tested
const request = supertest("https://gorest.co.in/public/v1/");
const request2 = supertest("http://localhost:4567/");

const token =
  "fb08f144ff6f763347ff05b4acc6a443be1494ec4fcbabe8f3b3f3d12bd3c22b";

describe("todo app", () => {
  it("GET /list", (done) => {
    request.get(`lists`).end((err, res) => {
      console.log(err);
      console.log(res.body);
      //   expect(res.body.data).to.not.be.empty;
      done();
    });
  });

  it("POST /list item", (done) => {
    const data1 = {
      label: "butter",
      completed: true,
    };
    request
      .post("list/0/add")
      .send(data1)
      .then((res) => {
        console.log(res.body.data);
        done();
      });
  });
});

describe.skip("Users", () => {
  it("GET /users", (done) => {
    request.get(`users?access-token=${token}`).end((err, res) => {
      // console.log(err);
      // console.log(res.body);
      expect(res.body.data).to.not.be.empty;
      done();
    });
  });

  // page=5&gender=Female&status=Active
  it.skip("GET /users/:id", () => {
    return request.get(`users/1?access-token=${token}`).then((res) => {
      console.log(res.body);
      expect(res.body.data.id).to.be.eq(1);
    });
  });

  it("GET /users with query params", () => {
    const url = `users/?access-token=${token}?page=5&gender=male&status=active`;

    return request.get(url).then((res) => {
      // console.log(res.body);
      // expect(res.body.data).to.be.not.empty;
      // expect(res.body.data.name).to.be.contain('Dhana Pothuvaal');
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq("male");
        expect(data.status).to.eq("active");
        // expect(data.page).to.eq(5);
      });
    });
  });

  it("POST /users", () => {
    const data = {
      name: "osama",
      gender: "male",
      status: "active",
      email: `osama.altaf-${Math.floor(Math.random() * 9999)}@gmail.com`,
    };

    return request
      .post("users")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        //Verify each object
        // expect(res.body.data.email).to.eq(data.email);
        // expect(res.body.data.gender).to.eq(data.gender);
        // expect(res.body.data.name).to.eq(data.name);
        // expect(res.body.data.status).to.eq(data.status);

        //if you want to verify all your data in single go
        expect(res.body.data).to.deep.include(data);
      });
  });

  it("PUT Users/:id", () => {
    const data1 = {
      name: "saima",
      status: "inactive",
      gender: "female",
    };

    return request
      .put("users/2836")
      .set("Authorization", `Bearer ${token}`)
      .send(data1)
      .then((res) => {
        console.log(res.body);
        // expect(res.body.data.status).to.equal(data.status);
        expect(res.body.data1).to.deep.include(data1);
      });
  });

  it("DELETE User/id:", () => {
    return request
      .delete("users/3054")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.be.eq();
      });
  });
});
//
