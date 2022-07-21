const Errors = require("../types/Errors");

class Storage {
  constructor(namespace) {
    this.list = [];
    this.sequence = 0;
    this.updateAt = Date.now();
    this.namespace = namespace;
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
  getItemIndexByProperty(key, value) {
    const itemIndex = this.list.findIndex((e) => (e[key] === value));
    if (itemIndex === -1) {
      throw new Error(`${this.namespace}-${Errors.NotFoundInStorage}`);
    }

    return itemIndex;
  }

  getItemByProperty(key, value) {
    const itemIndex = this.getItemIndexByProperty(key, value);
    return this.list[itemIndex];
  }

  getItemIdByProperty(key, value) {
    return this.getItemByProperty(key, value)?.id;
  }

  getItemById(id) {
    return this.getItemByProperty("id", id);
  }

  getItemIndexById(id) {
    return this.getItemIndexByProperty("id", id);
  }

  checkItemExistenceByProperty(key, value) {
    try {
      this.getItemIndexByProperty(key, value);
      return true;
    } catch (e) {
      if (!e.message.includes(Errors.NotFoundInStorage)) {
        throw e;
      }
      return false;
    }
  }

  addToList(item) {
    item.id = this.sequence;
    this.list.push(item);
    this.#increaseSequence();
    this.#updateTime();
    console.log(this.list);
  }

  removeFromList(id) {
    const itemIndex = this.getItemIndexById(id);
    this.list.splice(itemIndex, 1);
    this.#updateTime();
    console.log(this.list);
  }

  updateItemById(id, newOne) {
    const index = this.getItemById(id);
    let itemToUpdate = this.list[index];
    this.list[index] = Object.assign(itemToUpdate, filterIdProperty(newOne));
    return this.list[index];
  }
}

module.exports = Storage;
