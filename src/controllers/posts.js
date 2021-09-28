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
      .populate('whoPosted')
      .populate('user')
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

    const currentAddedPost = posts._id;
    await posts.save();

    const currentPost = await models.Posts.findOne({
        _id: currentAddedPost,
      }).populate('comments')
      .populate('whoPosted')
      .populate('user')
      .exec();

    return res.status(201).json({
      message: 'Пост був добавлений на стіну користувача.',
      data: currentPost,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};

const delepePost = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await models.Posts.findOneAndRemove({
      _id: req.params.id
    });
    res.status(200).json({
      message: 'Пост був видалений.',
      postID: id,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.'
    });
  };
};

module.exports = {
  getAllPostsAndComments,
  createNewPost,
  delepePost
};
