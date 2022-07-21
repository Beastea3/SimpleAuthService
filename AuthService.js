const Storage = require("./storage/AuthStorage");
const Role = require("./types/Roles");
const Errors = require("./types/Errors");
const User = require("./types/User");

const timeholder = new Promise((resolve) => setTimeout(resolve, 500));

class AuthService {
  #UserStorage;
  #TokenStorage;
  #RoleStorage;

  constructor() {
    this.#UserStorage = new Storage('user');
    this.#TokenStorage = new Storage('token');
    this.#RoleStorage = new Storage('role');
  }

  returnSuccess(msg = "") {
    return { success: "ok", message: msg };
  }

  returnFailure(msg = "") {
    return { success: "no", message: msg };
  }

  #checkUserExistenceByName(userName) {
    return this.#UserStorage.checkItemExistenceByProperty(
      "name",
      userName
    )
  }

  #checkRoleExistenceByName(roleName) {
    return this.#RoleStorage.checkItemExistenceByProperty(
      "name",
      roleName
    )
  }

  createUser(userName, password) {
    let hasUserExisted = this.#checkUserExistenceByName(userName);

    if (hasUserExisted) {
      throw new Error(Errors.UserAlreadyExist);
    }
    const user = new User(userName, password);
    this.#UserStorage.addToList(user);
    return this.returnSuccess();
  }

  deleteUser(userName) {
    let hasUserExisted = this.#checkUserExistenceByName(userName);

    if (!hasUserExisted) {
      throw new Error(Errors.UserNotFound);
    }

    const id = this.#UserStorage.getItemIdByProperty('name', userName);

    this.#UserStorage.removeFromList(id);
    return this.returnSuccess();
  }

  createRole(roleName) {
    let hasRoleExisted = this.#checkRoleExistenceByName(roleName);

    if (hasRoleExisted) {
      throw new Error(Errors.RoleAlreadyExist);
    }

    const role = new Role(roleName);
    this.#RoleStorage.addToList(role);
    return this.returnSuccess();
  }

  deleteRole(roleName) {
    let hasRoleExisted = this.#checkRoleExistenceByName(roleName);

    if (!hasRoleExisted) {
      throw new Error(Errors.RoleNotFound);
    }

    const id = this.#RoleStorage.getItemIdByProperty('name', roleName);

    this.#RoleStorage.removeFromList(id);
    return this.returnSuccess();
  }

  assignRoleToUser(userId, roleId) {
    const user = this.#UserStorage.getItemById(userId);
    const role = this.#RoleStorage.getItemById(roleId);

    user.addRoles([role]);

    return this.returnSuccess();
  }

  getUserById(id) {
    return this.#UserStorage.getItemById(id);
  }

  async authenticate(userName, password) {
    try {
      const user = this.#UserStorage.getItemByProperty('name', userName);
      //TODO: Timing Attack Proof
      const res = user.checkPassword(password);
      if (!res) {
        this.returnFailure();
      }
      return this.returnSuccess();
    } catch (error) {
      console.log(error);
      this.returnFailure();
    }

  }
}

module.exports = AuthService;
