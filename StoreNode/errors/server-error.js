// A class which is an extension of the existing error class
class ServerError extends Error {
  // Actual usage :
  // 1. THE USERS throws the error, due to a failed validation.
  // in such a case, the user ONLY supplies the : errorType + (optional) the message
  // 2. A 3rd party exception occurs, in such a case we'd like to wrap that exception
  // with a ServerError, YET (!!) without losing the information on the INITIAL
  // cause (the first error). So the 2nd version is when we WRAP an internal (inner) exception
  constructor(errorType, message, innerError) {
    // Initializing the following variables and also using super()
    // to append the message child from its parent
    super(message);
    this.errorType = errorType;
    this.innerError = innerError;
  }

  // Iterates through a symbol object that's contained in an array
  // in order to identify the cause of the error
  [Symbol.iterator]() {
    let current = this;
    let done = false;
    const iterator = {
      next() {
        const val = current;
        if (done) {
          return { value: val, done: true };
        }
        current = current.cause;
        if (!val.cause) {
          done = true;
        }
        return { value: val, done: false };
      },
    };
    return iterator;
  }
  // Retrieving the specific details of the occured error
  get why() {
    let _why = "";
    for (const e of this) {
      _why += `${_why.length ? " <- " : ""}${e.name}: ${e.message}`;
    }
    return _why;
  }
}

// Exporting ServerError Class to external files...
module.exports = ServerError;
