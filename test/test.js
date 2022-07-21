const assert = require('assert');
const AuthService = require('../index.js');

const authService = new AuthService();
const assertOk = (res) => assert(res.success === 'ok');

describe('test', function () {
  describe('Main workflow of this service should be fine', function () {
    it('create a user', function () {
      const res = authService.createUser('monstea', '12345');
      assertOk(res);
    });
    it('delete a user', function () {
      const res = authService.deleteUser('monstea');
      assertOk(res);
    });
    it('create a new user', function () {
      const res = authService.createUser('Chris', '901920');
      assertOk(res);
    });
    it('create a new role', function () {
      const res = authService.createRole('Developer');
      assertOk(res);
    });

    it('create a new role', function () {
      const res = authService.createRole('Athlete');
      assertOk(res);
    });

    it('create a new role', function () {
      const res = authService.createRole('Photographer');
      assertOk(res);
    });

    it('create a new role', function () {
      const res = authService.createRole('Designer');
      assertOk(res);
    });

    it('delete the Designer role', function () {
      const res = authService.deleteRole('Designer');
      assertOk(res);
      // assert(roles list does not include designer)
    });

    it('assign role to user', function () {
      const res = authService.assignRoleToUser(1, 0);
      assertOk(res);
    });
    it('user should have a developer role', function () {
      const res = authService.getUserById(1);
      console.log(res);
      assert(res.roles.some((e) => e.name === 'Developer'));
    });
  });
});