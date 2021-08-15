const models = require('../models/index');
const parceJwt = require('../utils/parceJwt').parseJwt;

const createNewComment = async (req, res) => {
  try {
    const {
      description,
      user,
    } = await req.body;

    if (!description) {
      return res.status(400).json({
        message: 'Коментар не заповнено.',
      });
    }
    const {
      idPost,
    } = await req.params;

    const currentPost = await models.Posts.findOne({
      _id: idPost,
    }).exec();

    if (!currentPost) {
      return res.status(404).json({
        message: 'Пост не знайдено.',
      });
    }
    // TODO Раз я провіряю в мідлварі токен, то тут уже не потрібно провіряти чи він є
    const accesToken = req.headers.authorization.split(' ')[1];
    const currentUserId = parceJwt(accesToken).userId;
    const comments = new models.Comments({
      description,
      user, // користувач якому постять коммент
      whoPosted: currentUserId, // користувач який постить комент
    });

    currentPost.comments.push(comments._id);

    await comments.save();
    await currentPost.save();

    return res.status(201).json({
      message: 'Коментарій успішно добавлено.',
      data: comments,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  }
};

module.exports = {
  createNewComment,
};
