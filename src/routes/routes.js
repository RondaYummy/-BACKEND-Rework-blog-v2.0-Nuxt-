const {
  Router,
} = require('express');

const router = Router();
const auth = require('../middleware/auth');
const controllers = require('../controllers/index');

// Auth
router.post('/signin', controllers.auth.signIn);
router.post('/refresh-tokens', controllers.auth.refreshTokens);

// Logout / Disconnect
router.post('/logout', controllers.logout.disconnect);

// Registration
router.post('/registration', controllers.auth.signUp);

// ОТРИМАТИ НАДІСЛАНІ ЧИ ВХІДНІ ЗАЯВКИ 
router.get('/user/friend-requests', auth, controllers.friends.applicationsToFriends);

// User profile
router.get('/user/:id', controllers.usersApi.currentUser);

// ДОБАВИТИ НОВИЙ ПОСТ
router.post('/user/:id/posts', auth, controllers.posts.createNewPost);

// ДОБАВИТИ ДО ВИБРАНОГО
router.post('/user/:id/favorite', auth, controllers.usersApi.addFavorite);

// ВИДАЛИТИ ІЗ ВИБРАНОГО
router.delete('/user/:id/favorite', auth, controllers.usersApi.DeleteFromFavorite);

// ОТРИМАТИ ВСІ ПОСТИ ЮЗЕРА
router.get('/user/:id/posts/', controllers.posts.getAllPosts);

// РЕДАГУВАТИ ПОСТ
router.put('/user/post/:id', auth, controllers.posts.editPost);

// ДОДАТИ НОВИЙ КОМЕНТ ДО ПОСТА
router.post('/posts/:postId/comments', auth, controllers.comments.createNewComment);

// ОТРИМАТИ ВСІ КОМЕНТИ ДО ПОСТА
router.get('/posts/:postId/comments/', controllers.comments.getAllComments);

// РЕДАГУВАТИ КОМЕНТ
router.put('/user/:id/comment', auth, controllers.comments.editComment);

// ДОБАВИТИ КОРИСТУВАЧА В ДРУЗІ
router.post('/user/:id/friends', auth, controllers.friends.addFriend);

// ПРИЙНЯТИ ЗАПИТ ВІД КОРИСТУВАЧА ( у друзі )
router.post('/user/friends/accept/:id', auth, controllers.friends.acceptsFriend);

// ВІДХИЛИТИ ЗАПИТ ВІД КОРИСТУВАЧА ( у друзі )
router.post('/user/friends/reject/:id', auth, controllers.friends.rejectFriendRequest);

// ВИДАЛИТИ КОРИСТУВАЧА ІЗ ДРУЗІ
router.delete('/user/:id/friends', auth, controllers.friends.deleteUserFriend);

// ВИВЕСТИ УСІХ ДРУЗІВ КОРИСТУВАЧА
router.get('/friends/:id', controllers.friends.getUserFriends);

// ПОШУК КОРИСТУВАЧІВ
router.get('/user/search/:v', controllers.searchUsers.searchUsers);

// ВИДАЛИТИ ПОСТ
router.delete('/posts/:id', auth, controllers.posts.delepePost);

// ВИДАЛИТИ КОМЕНТ
router.delete('/posts/:id/comment', auth, controllers.comments.delepeComment);

module.exports = router;
