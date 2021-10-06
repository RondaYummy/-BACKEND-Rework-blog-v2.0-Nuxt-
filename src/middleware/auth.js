const jwt = require('jsonwebtoken');

const {
  secret,
} = require('../../config/development.json').jwt;

const models = require('../models/index');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({
      message: 'Token not provided!!!',
    });
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  
  if (!req.user) {
    // TODO помилка userId невідомий якщо користувач не авторизований, коректно?
    res.status(401).json({
      message: 'Invalid userId!',
    });;
  }

  const tokensDb = await models.UserToken.findOne({
    user: req.user.userId,
  }).exec();

  if (token !== tokensDb.token) {
    res.status(401).json({
      message: 'Invalid access DB token!',
    });
    return;
  }
  const payload = jwt.verify(token, secret);
  if (payload.type !== 'access') {
    res.status(401).json({
      message: 'Invalid access token!',
    });
    return;
  }
  next();
};
