const pick = require('lodash/pick');
const models = require('../models/index');


const addFriend = async (req, res) => {
  try {

    const currentUser = await models.User.findOne({
      _id: req.user.userId,
    }).exec();

    const futureFriend = await models.User.findOne({
      _id: req.params.id,
    }).exec();

    if (!futureFriend || !currentUser) {
      return res.status(404).json({
        message: 'Користувач не знайдений',
      });
    }

    if (currentUser.friends.find((v) => String(futureFriend._id) === String(v))) {
      return res.status(200).json({
        message: 'Користувач уже є другом',
      });
    }

    if (String(req.user.userId) === String(req.params.id)) {
      return res.status(400).json({
        message: 'Ви не можете додати себе в друзі',
      });
    };

    const requestForUser = new models.RequestFriends({
      sentBy: req.user.userId,
      acceptedBy: req.params.id,
      isAccepted: false
    });
    await requestForUser.save();


    return res.status(201).json({
      message: 'Користувачу був надісланий запит.',
      requestForUser
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  }
};

const acceptsFriend = async (req, res) => {
  const {
    id,
  } = req.params;

  const currentRequest = await models.RequestFriends.findOne({
    _id: id,
  }).exec();

  if (!currentRequest) {
    return res.status(404).json({
      message: 'Запит у друзі не знайдено.',
    });
  }
  currentRequest.isAccepted = true;
  currentRequest.save();

  return res.status(201).json({
    message: 'Ви прийняли запит в друзі від користувача.',
  });
};

const rejectFriendRequest = async (req, res) => {
  const {
    id,
  } = req.params;

  await models.RequestFriends.findOneAndRemove({
    _id: id,
  }).exec();

  return res.status(201).json({
    message: 'Ви відхилили запит в друзі від користувача.',
  });
};

// отримати надіслані запити у друзі
const applicationsToFriends = async (req, res) => {
  try {
    console.log('sdds');
    const {
      query = {}
    } = req;
    console.log(query);

    const _query = pick(query, ['acceptedBy', 'sentBy'])

    const result = await models.RequestFriends
      .find(_query).exec();

    // const arrayApplicationsToFriends = await models.FriendsRequest.find({
    //   $or: [{
    //       sentBy: id
    //     },
    //     {
    //       acceptedBy: id
    //     },
    //   ]
    // })

    if (!result) {
      return res.status(404).json({
        message: 'Запитів не знайдено.',
      });
    }

    return res.status(201).json({
      message: 'Заявки отримано.',
      result
    });
  } catch (error) {
    console.log(error);
    return error;
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

const deleteUserFriend = async (req, res) => {
  const {
    id,
  } = req.params;

  console.log(id);



  return res.status(201).json({
    message: 'Користувача видалено із друзів.',
  });
}
module.exports = {
  addFriend,
  getUserFriends,
  deleteUserFriend,
  acceptsFriend,
  rejectFriendRequest,
  applicationsToFriends,
};
