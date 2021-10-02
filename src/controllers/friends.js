const models = require('../models/index');
const parceJwt = require('../utils/parceJwt').parseJwt;

const addFriend = async (req, res) => {
  try {
    const accesToken = req.headers.authorization.split(' ')[1];
    const currentUserId = parceJwt(accesToken).userId;
    const currentUser = await models.User.findOne({
      _id: currentUserId,
    }).exec();

    const futureFriend = await models.User.findOne({
      _id: req.params.id,
    }).exec();

    if (String(currentUser._id) === String(futureFriend._id)) {
      return res.status(400).json({
        message: 'Ви не можете додати себе в друзі',
      });
    }

    if (!futureFriend) {
      return res.status(404).json({
        message: 'Користувач не знайдений',
      });
    }

    if (currentUser.friends.find((v) => String(futureFriend._id) === String(v))) {
      return res.status(200).json({
        message: 'Користувач уже є другом',
      });
    }

    futureFriend.friends.push(currentUser._id);
    currentUser.friends.push(futureFriend._id);

    await currentUser.save();
    await futureFriend.save();

    return res.status(201).json({
      message: 'Користувач був добавлений до друзів.',
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const {
      id,
    } = req.params;

    const dd = await models.User.find({
      _id: id,
    }).populate('friends');

    return res.status(201).json({
      message: 'Усі друзі користувача.',
      data: dd,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  }
};
module.exports = {
  addFriend,
  getUserFriends,
};
