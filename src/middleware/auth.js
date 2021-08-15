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

  const tokensDb = await models.UserToken.findOne({
    user: req.user.userId,
  }).exec();
  if (token === tokensDb.token) {
    console.log('Acces Allowed!');
  } else {
    res.status(401).json({
      message: 'Invalid access token!',
    });
  }
  // TODO зробити провірку валідності токена
  try {
    const payload = jwt.verify(token, secret);
    if (payload.type !== 'access') {
      res.status(401).json({
        message: 'Invalid access token!',
      });
    }
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({
        message: 'Token experied!',
      });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({
        message: 'invalid token!',
      });
    }
  }
};
