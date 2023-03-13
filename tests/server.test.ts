import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "..";

chai.use(chaiHttp);
chai.should();

describe("Server", function () {
    // specification code
    it("returns status 200", function () {
        chai.request(app)
            .get("/")
            .send()
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(200);
                }
            });
    });
});
