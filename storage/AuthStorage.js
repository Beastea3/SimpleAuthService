const Errors = require('../types/Errors');

class Storage {
  constructor() {
    this.list = [];
    this.sequence = 0;
    this.updateAt = Date.now();
  }

  #updateTime() {
    this.updateAt = Date.now();
  }

  #increaseSequence() {
    this.sequence += 1;
  }

  static filterIdProperty(item) {
    if (typeof item !== "object") {
      throw new Error(Errors.NotFoundInStorage);
    }
    return Object.keys(item)
      .filter((e) => e !== "id")
      .reduce((acc, e) => Object.assign(acc, { [e]: item[e] }), {});
  }

  // Storage CRUD
  getItemIdByProperty(key, value) {
    const itemIndex = this.list.findIndex((e) => (e[key] = value));

    if (itemIndex === -1) {
      return new Error();
    }

    return itemIndex;
  }

  getItemByProperty(key, value) {
    this.getItemByProperty(key, value);
    return this.list[itemIndex];
  }

  addToList(item) {
    item.id = this.sequence;
    this.list.push(item);
    this.#increaseSequence();
    this.#updateTime();
  }

  removeFromList(id) {
    const itemIndex = this.getItemIdByProperty("id", id);
    this.list.splice(itemIndex, 1);
    this.#updateTime();
  }

  updateItemById(id, newOne) {
    const index = this.getItemIdByProperty("id", id);
    let itemToUpdate = this.list[index];
    this.list[index] = Object.assign(itemToUpdate, filterIdProperty(newOne));
    return this.list[index];
  }
}

module.export = AuthStorage;
