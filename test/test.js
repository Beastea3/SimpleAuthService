const assert = require("assert");
const AuthService = require("../index.js");
const Errors = require("../types/Errors.js");

const authService = new AuthService();
const assertOk = (res) => assert(res.success === "ok");
const assertFailure = (res) => assert(res.success === "no");
let secret = "";

describe("test", function () {
  describe("Main workflow of this service should be fine", function () {
    it("create a user", function () {
      const res = authService.createUser("monstea", "12345");
      assertOk(res);
    });
    it("delete a user", function () {
      const res = authService.deleteUser("monstea");
      assertOk(res);
    });
    it("create a new user", function () {
      const res = authService.createUser("Chris", "901920");
      assertOk(res);
    });
    it("create a new role", function () {
      const res = authService.createRole("Developer");
      assertOk(res);
    });

    it("create a new role", function () {
      const res = authService.createRole("Athlete");
      assertOk(res);
    });

    it("create a new role", function () {
      const res = authService.createRole("Photographer");
      assertOk(res);
    });

    it("create a new role", function () {
      const res = authService.createRole("Designer");
      assertOk(res);
    });

    it("delete the Designer role", function () {
      const res = authService.deleteRole("Designer");
      assertOk(res);
      // assert(roles list does not include designer)
    });

    it("assign role to user", function () {
      const res = authService.assignRoleToUser(1, 0);
      assertOk(res);
    });
    it("user should have a developer role", function () {
      const res = authService.getUserById(1);
      assert(res.roles.some((e) => e.name === "Developer"));
    });

    it("user should login smoothly With correct pw", function () {
      const res = authService.authenticate("Chris", "901920");
      assertOk(res);
      secret = res.message;
      assert(res.message.length === 32);
    });

    it("user should login smoothly W/O correct pw", function () {
      const res = authService.authenticate("Chris", "wrong one");
      assertFailure(res);
    });

    it("should invalidate token successfully ", function () {
      const res = authService.invalidateToken(secret);
      assertFailure(res);
    });

    it("token should invalid after invalidation ", function () {
      const res = authService.checkRole(secret, "Developer");
      assert(res.message === Errors.TokenExpired);
    });

    it("reauthenticate", function () {
      const res = authService.authenticate("Chris", "901920");
      assertOk(res);
      secret = res.message;
    });

    it("should check Role successfully", function () {
      const res = authService.checkRole(secret, "Developer");
      assert(res === true);
    });

    it("should check Role successfully, but has no designer role", function () {
      const res = authService.checkRole(secret, "Designer");
      assert(res === false);
    });

    it("should get all roles", function () {
      const res = authService.allRoles(secret);
      assert(Array.isArray(res));
    });
  });
});
