const Storage = require("./storage/AuthStorage");
const Roles = require("./types/Roles");

class AuthService {
  constructor() {
    this.UserStorage = new Storage();
    this.TokenStorage = new Storage();
    this.Roles = Roles;
  }
}

module.export = AuthService;
