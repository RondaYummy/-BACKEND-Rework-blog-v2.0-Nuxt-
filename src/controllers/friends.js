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

    const sendedCurr = await models.RequestFriends.findOne({
      sentBy: req.user.userId,
    }).exec();

    const forMeSended = await models.RequestFriends.findOne({
      acceptedBy: req.user.userId,
    }).exec();

    if (sendedCurr) {
      return res.status(403).json({
        message: 'Звявку уже надіслано.',
      });
    };

    if (forMeSended) {
      return res.status(400).json({
        message: 'Цей користувач уже надіслав вам заявку в друзі.',
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


  const reqFriend = await models.RequestFriends.findOne({
    _id: id,
  }).exec();

  if (!reqFriend) {
    return res.status(401).json({
      message: 'Такої заявки в друзі не знайдено.',
    });
  }

  reqFriend.remove();
  return res.status(201).json({
    message: 'Ви відхилили запит в друзі від користувача.',
  });
};

const cancelFriendRequest = async (req, res) => {
  const {
    id,
  } = req.params;

  const canceled = await models.RequestFriends.findOne({
    sentBy: req.user.userId,
    _id: id
  }).exec();

  if (!canceled) {
    return res.status(401).json({
      message: 'Такої заявки в друзі не знайдено.',
    });
  };

  canceled.remove();
  return res.status(201).json({
    message: 'Ви відмінили заявку у друзі.',
  });
};

// отримати надіслані запити у друзі
const applicationsToFriends = async (req, res) => {
  try {
    const {
      query = {}
    } = req;
    const _query = pick(query, ['acceptedBy', 'sentBy'])
    _query.isAccepted = false;

    const arrayApplicationsToFriends = await models.RequestFriends.find({
        ..._query,
        $or: [{
            sentBy: req.user.userId,
          },
          {
            acceptedBy: req.user.userId
          },
        ]
      }).populate('sentBy')
      .populate('acceptedBy')
      .exec();

    if (!arrayApplicationsToFriends) {
      return res.status(404).json({
        message: 'Заявок не знайдено.',
      });
    }

    return res.status(201).json({
      message: 'Заявки отримано.',
      arrayApplicationsToFriends,
      requestName: Object.keys(_query)[0],
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Щось пішло не так.',
    });
  };
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

  const currentUser = await models.User.findOne({
    _id: req.user.userId,
  }).exec();

  const futureFriend = await models.User.findOne({
    _id: id,
  }).exec();

  if (!futureFriend || !currentUser) {
    return res.status(404).json({
      message: 'Користувач не знайдений',
    });
  }
  const indexCurr = currentUser.friends.indexOf(id);
  const faturIndex = futureFriend.friends.indexOf(req.user.userId);

  if (indexCurr < 0 || faturIndex < 0) {
    return res.status(404).json({
      message: 'Користувача не знайдено серед друзів.',
    });
  };

  currentUser.friends.splice(indexCurr, 1);
  futureFriend.friends.splice(faturIndex, 1);
  currentUser.save();
  futureFriend.save();


  return res.status(201).json({
    message: 'Користувача видалено із друзів.',
  });
}
module.exports = {
  addFriend,
  applicationsToFriends,
  getUserFriends,
  deleteUserFriend,
  acceptsFriend,
  rejectFriendRequest,
  cancelFriendRequest,

};
