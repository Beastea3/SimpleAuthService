const TOKEN_EXPIRE_IN = 2 * 3600 * 1000;

class Token {
  constructor(assignee, tokenIdentifier) {
    this.id = null;
    this.assignee = assignee;
    this.tokenIdentifier = tokenIdentifier;
    this.createdTime = Date.now();
    this.updatedTime = Date.now();
  }

  static checkValidation() {
    const now = Date.now();
    if (now < this.updatedTime + TOKEN_EXPIRE_IN) {
      return true;
    }
    return false;
  }

  refresh() {
    this.updatedTime = Date.now();
  }
}

module.exports = Token;