const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;// 401

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedError;
