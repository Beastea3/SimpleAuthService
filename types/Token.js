const TOKEN_EXPIRE_IN = 2 * 3600 * 1000;

class Token {
  constructor(assignee, tokenIdentifier, _createdTime) {
    this.id = null;
    this.assignee = assignee;
    this.tokenIdentifier = tokenIdentifier;
    this.createdTime = _createdTime;
    this.updatedTime = _createdTime;
    this.isValid = true;
  }

  checkValidation() {
    if (!this.isValid) {
      return false;
    }
    const now = Date.now();
    console.log('asaaas', now, this.updatedTime + TOKEN_EXPIRE_IN)
    if (now < this.updatedTime + TOKEN_EXPIRE_IN) {
      return true;
    }
    return false;
  }

  refresh() {
    this.updatedTime = Date.now();
  }

  invalidate() {
    this.isValid = false;
  }
}

module.exports = Token;