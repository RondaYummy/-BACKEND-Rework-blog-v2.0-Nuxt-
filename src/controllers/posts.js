const models = require('../models/index');
// ОТРИМАТИ ВСІ ПОСТИ ЮЗЕРА
// /api/:userID/posts/
const getAllPostsAndComments = async (req, res) => {
  try {
    const {
      id,
    } = req.params;

    const allPosts = await models.Posts.find({
      user: id,
    }).populate('comments')
      .exec();

    return res.status(201).json({
      message: 'Пости були получені.',
      data: allPosts,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};

const createNewPost = async (req, res) => {
  try {
    const {
      description,
    } = await req.body;

    if (!description) {
      return res.status(400).json({
        message: 'Ви не написали поста.',
      });
    }
    const posts = new models.Posts({
      description,
      user: req.params.id, // користувач якому постять коммент
      whoPosted: req.user.userId,
    });

    await posts.save();

    return res.status(201).json({
      message: 'Пост був добавлений на стіну користувача.',
      data: posts,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};

module.exports = {
  getAllPostsAndComments,
  createNewPost,
};
