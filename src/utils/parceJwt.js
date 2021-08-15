const jwt = require('jsonwebtoken');

function parseJwt(token) {
  const decoded = jwt.decode(token);
  return decoded;
}

module.exports = {
  parseJwt,
};
