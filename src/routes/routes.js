const {
  Router,
} = require('express');

const router = Router();
const auth = require('../middleware/auth');
const controllers = require('../controllers/index');

// Auth
// /api/signin
// /api/refresh-tokens
router.post('/signin', controllers.auth.signIn);
router.post('/refresh-tokens', controllers.auth.refreshTokens);

// Logout / Disconnect
// /api/logout
router.post('/logout', controllers.logout.disconnect);

// Registration
// /api/registration
router.post('/registration', controllers.auth.signUp);

// Current User
// api/user
router.get('/user/:id', auth, controllers.usersApi.currentUser);

// /api/user/:id/posts
// ДОБАВИТИ НОВИЙ ПОСТ
router.post('/user/:id/posts', auth, controllers.posts.createNewPost);

// // ОТРИМАТИ ВСІ ПОСТИ ЮЗЕРА
// // /api/:userID/posts/
router.get('/user/:id/posts/', auth, controllers.posts.getAllPostsAndComments);

// /api/posts/id/comments
// ДОДАТИ НОВИЙ КОМЕНТ ДО ПОСТА
router.post('/posts/:idPost/comments', auth, controllers.commnets.createNewComment);

// /api/friends/:id
// ДОБАВИТИ КОРИСТУВАЧА В ДРУЗІ
router.post('/friends/:id', auth, controllers.friends.addFriend);

// /api/friends/id
// ВИВЕСТИ УСІХ ДРУЗІВ КОРИСТУВАЧА
router.get('/friends/:id', auth, controllers.friends.getUserFriends);

module.exports = router;
