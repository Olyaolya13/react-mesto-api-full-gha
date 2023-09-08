const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;
// 404
// console.log(HTTP_STATUS_NOT_FOUND);

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
