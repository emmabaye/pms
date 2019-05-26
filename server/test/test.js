/* eslint-disable max-nested-callbacks */
import supertest from "supertest";
import should from "should";

let server = supertest.agent("http://localhost:3000");
let locationDetails = [{
  name: `Ada george${Math.random()}`,
  malePopulation: "250000",
  femalePopulation: "200000",
  parentLocationId: "1",
}];

let locationId;


describe("Population Management System", () => {
  it("should return 200 for API index endpoint", (done) => {
    server
      .get("/api/v1")
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        (res.body.title).should.equal('Welcome to my Population Management System');
        done();
      });
  });

  it("should return 302 for index endpoint redirecting to API index", (done) => {
    server
      .get("/")
      .expect(302)
      .end((err, res) => {
        res.status.should.equal(302);
        done();
      });
  });

  describe("Add location", () => {
    it("should add location", (done) => {
      server
        .post('/api/v1/locations')
        .send(locationDetails[0])
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.data.name).should.equal(locationDetails[0].name);
          locationId = res.body.data.id;
          done();
        });
    });

    it("should  not add location, returns 400 for undefined  name", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], name: undefined })
        .expect(400)
        .end((err, res) => {
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Name of location is required');
          res.status.should.equal(400);
          done();
        });
    });

    it("should  not add location, returns 400 for undefined  male population", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], malePopulation: undefined })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid male population is required');
          done();
        });
    });

    it("should  not add location, returns 400 for undefined  female population", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], femalePopulation: undefined })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid female population is required');
          done();
        });
    });

    it("should  not add location, returns 400 for invalid parent location id ", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], parentLocationId: "uefined" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid parent location id is required.');
          done();
        });
    });


    it("should fail to add location", (done) => {
      server
        .post('/api/v1/locations')
        .send(locationDetails[0])
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          (res.body.status).should.equal('Fail');
          (res.body.message).should.equal('Location already exists');
          done();
        });
    });

    it("should fail to add location for valid parent location id that does not exist", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], parentLocationId: "99999999" })
        .expect(404)
        .end((err, res) => {
          res.status.should.equal(404);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Parent location not found');
          done();
        });
    });


    it("should fail to add location for population greater than parent population", (done) => {
      server
        .post('/api/v1/locations')
        .send({ ...locationDetails[0], femalePopulation: "9999999999" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Location populations should not be greater than that of parent location');
          done();
        });
    });

    it("should add location without parent location id", (done) => {
      server
        .post('/api/v1/locations')
        .send({
          ...locationDetails[0],
          name: "Maryland",
          parentLocationId: undefined,
        })
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Location created');
          (res.body.data.name).should.equal('Maryland');
          locationId = res.body.data.id;
          done();
        });
    });
  });

  describe("Update location", () => {
    it("should update location", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ name: "Awka" })
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          done();
        });
    });

    it("should fail to update location that does not exist, returns 404", (done) => {
      server
        .put(`/api/v1/locations/99999`)
        .send({ name: "Awka" })
        .expect(404)
        .end((err, res) => {
          res.status.should.equal(404);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Location not found');
          done();
        });
    });
    it("should  not update location, returns 400 for empty name", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ name: "" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Invalid name of location');
          done();
        });
    });

    it("should  not update location, returns 400 for invalid male population value", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ malePopulation: "abc" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid male population is required');
          done();
        });
    });

    it("should  not update location, returns 400 for invalid male population value", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ femalePopulation: "defg" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid female population is required');
          done();
        });
    });

    it("should  not update location, returns 400 for greater male population than parent location", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ malePopulation: "9999999999", parentLocationId: "1" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Location populations should not be greater than that of parent location');
          done();
        });
    });

    it("should  not update location, returns 400 for invalid parent location id", (done) => {
      server
        .put(`/api/v1/locations/${locationId}`)
        .send({ parentLocationId: "hi" })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Valid parent location id is required');
          done();
        });
    });
  });

  describe("Get all locations", () => {
    it("should get all locations", (done => {
      server
        .get('/api/v1/locations')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('All Locations retrieved');
          (Array.isArray(res.body.data)).should.equal(true);
          done();
        });
    }));
  });

  describe("Get a specific locations", () => {
    it("should get a specific location", (done => {
      server
        .get('/api/v1/locations/2')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Location found');
          done();
        });
    }));

    it("should fail to get a specific location, returns 404", (done => {
      server
        .get('/api/v1/locations/999')
        .expect(404)
        .end((err, res) => {
          res.status.should.equal(404);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Location does not exist');
          done();
        });
    }));
  });

  describe("Delete a specific location", () => {
    it("should delete a specific location", (done => {
      server
        .delete(`/api/v1/locations/${locationId}`)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          (res.body.status).should.equal('Success');
          (res.body.message).should.equal('Location deleted successfully');
          done();
        });
    }));

    it("should fail to delete a specific location, returns 404", (done => {
      server
        .delete('/api/v1/locations/999999')
        .expect(404)
        .end((err, res) => {
          res.status.should.equal(404);
          (res.body.status).should.equal('Error');
          (res.body.message).should.equal('Location does not exist');
          done();
        });
    }));
  });
});
