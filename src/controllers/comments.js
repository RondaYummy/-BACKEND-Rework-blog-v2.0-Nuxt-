const models = require('../models/index');
// const parceJwt = require('../utils/parceJwt').parseJwt;

const createNewComment = async (req, res) => {
  try {
    const {
      description,
      user,
      whoPosted
    } = req.body;

    if (!description) {
      return res.status(400).json({
        message: 'Коментар не заповнено.',
      });
    }
    const {
      postId,
    } = req.params;

    const currentPost = await models.Posts.findOne({
      _id: postId,
    }).exec();

    if (!currentPost) {
      return res.status(404).json({
        message: 'Пост не знайдено.',
      });
    }

    const comments = new models.Comments({
      description,
      user, // користувач якому постять коммент
      whoPosted, // користувач який постить комент
      postId
    });

    currentPost.comments.push(comments._id);
    await comments.save();
    await currentPost.save();

    return res.status(201).json({
      message: 'Коментарій успішно добавлено.',
      data: comments,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  }
};

const delepeComment = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await models.Comments.findOneAndRemove({
      _id: req.params.id
    });

    res.status(200).json({
      message: 'Комент був видалений.',
      postID: id,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.'
    });
  };
};

const getAllComments = async (req, res) => {
  try {
    const {
      postId
    } = req.params;

    const allcomments = await models.Comments.find({
        postId
      })
      .populate('whoPosted')
      .exec();

    return res.status(201).json({
      message: 'Коменти були получені.',
      data: allcomments,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};
module.exports = {
  createNewComment,
  delepeComment,
  getAllComments
};
