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
router.post('/logout', controllers.logout.disconnect);

// Registration
router.post('/registration', controllers.auth.signUp);

// User profile
router.get('/user/:id', controllers.usersApi.currentUser);

// ДОБАВИТИ НОВИЙ ПОСТ
router.post('/user/:id/posts', auth, controllers.posts.createNewPost);

// ОТРИМАТИ ВСІ ПОСТИ ЮЗЕРА
router.get('/user/:id/posts/', controllers.posts.getAllPosts);

// РЕДАГУВАТИ ПОСТ
router.put('/user/post/:id', controllers.posts.editPost);

// ДОДАТИ НОВИЙ КОМЕНТ ДО ПОСТА
router.post('/posts/:postId/comments', auth, controllers.comments.createNewComment);

// ОТРИМАТИ ВСІ КОМЕНТИ ДО ПОСТА
router.get('/posts/:postId/comments/', controllers.comments.getAllComments);

// РЕДАГУВАТИ КОМЕНТ
router.put('/user/:id/comment', controllers.comments.editComment);

// ДОБАВИТИ КОРИСТУВАЧА В ДРУЗІ
router.post('/friends/:id', auth, controllers.friends.addFriend);

// ВИВЕСТИ УСІХ ДРУЗІВ КОРИСТУВАЧА
router.get('/friends/:id', controllers.friends.getUserFriends);

// ПОШУК КОРИСТУВАЧІВ
router.get('/user/search/:v', controllers.searchUsers.searchUsers);

// ВИДАЛИТИ ПОСТ
router.delete('/posts/:id', controllers.posts.delepePost);

// ВИДАЛИТИ КОМЕНТ
router.delete('/posts/:id/comment', controllers.comments.delepeComment);

module.exports = router;
