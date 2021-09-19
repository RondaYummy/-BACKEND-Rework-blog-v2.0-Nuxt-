const auth = require('./auth');
const logout = require('./logout');
const usersApi = require('./usersApi');
const posts = require('./posts');
const commnets = require('./comments');
const friends = require('./friends');
const searchUsers = require('./searchUsers');

module.exports = {
  auth,
  logout,
  usersApi,
  posts,
  commnets,
  friends,
  searchUsers,
};
