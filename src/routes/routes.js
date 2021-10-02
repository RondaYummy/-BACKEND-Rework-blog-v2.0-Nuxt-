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

// User profile
// api/user/:id
router.get('/user/:id', controllers.usersApi.currentUser);

// /api/user/:id/posts
// ДОБАВИТИ НОВИЙ ПОСТ
router.post('/user/:id/posts', auth, controllers.posts.createNewPost);

// // ОТРИМАТИ ВСІ ПОСТИ ЮЗЕРА
// // /api/:userID/posts/
router.get('/user/:id/posts/', controllers.posts.getAllPostsAndComments);

// /api/user/post/:id/
// РЕДАГУВАТИ ПОСТ
router.put('/user/post/:id', controllers.posts.editPost);

// /api/posts/id/comments
// ДОДАТИ НОВИЙ КОМЕНТ ДО ПОСТА
router.post('/posts/:idPost/comments', auth, controllers.commnets.createNewComment);

// /api/friends/:id
// ДОБАВИТИ КОРИСТУВАЧА В ДРУЗІ
router.post('/friends/:id', auth, controllers.friends.addFriend);

// /api/friends/id
// ВИВЕСТИ УСІХ ДРУЗІВ КОРИСТУВАЧА
router.get('/friends/:id', controllers.friends.getUserFriends);

// Пошук користувачів
// /api/user/search/:v
router.get('/user/search/:v', controllers.searchUsers.searchUsers);

// ВИДАЛИТИ ПОСТ
// /api/posts/:id
router.delete('/posts/:id', controllers.posts.delepePost);

// ВИДАЛИТИ КОМЕНТ
// /posts/:id/comment
router.delete('/posts/:id/comment', controllers.commnets.delepeComment);
module.exports = router;
