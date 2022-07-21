const assert = require("assert");
const AuthService = require("../index.js");
const Errors = require("../types/Errors.js");

const authService = new AuthService();
const assertOk = (res) => assert(res.success === "ok");
let secret = "";

describe("Some Boundary tests", function () {
  it("token should expire after 2 hours", async function () {
    this.timeout(5000);
    // create a User
    const res = authService.createUser("monstea", "12345");
    assertOk(res);
    // authenticate with 1 hour 59 mins 58s ago;
    const a = authService.authenticate(
      "monstea",
      "12345",
      Date.now() - (3600 * 2 - 2) * 1000
    );
    secret = a.message;
    // check role should successful in this time;
    authService.createRole('Developer');
    authService.assignRoleToUser(0, 0);
    const b = authService.checkRole(secret, "Developer");
    assert(b === true);

    // wait for 4 secs, and will return error
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const shouldFail = authService.checkRole(secret, "Developer");
    assert(shouldFail.message === Errors.TokenExpired);
  });
});
