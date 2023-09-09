const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET = 'secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
