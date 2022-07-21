var md5 = require("md5");

class User {
  constructor(name, password) {
    this.name = name;
    this.password = md5(password);
    this.roles = [];
  }

  checkPassword(password) {
    if (md5(password) !== this.password) {
      return false;
    }
    return true;
  }

  addRoles(roles) {
    this.roles = [...this.roles, ...roles].filter(
      (e, i, a) => a.indexOf(e) === i
    );
  }
}

module.exports = User;
