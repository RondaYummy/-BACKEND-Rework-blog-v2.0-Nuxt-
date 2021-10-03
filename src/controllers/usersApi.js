const models = require('../models/index');

const currentUser = async (req, res) => {
  try {
    const {
      id,
    } = req.params;
    const user = await models.User.findOne({
      _id: id,
    }).exec();

    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений.',
      });
    }
    return res.status(200).json({
      message: 'Користувач був отриманий.',
      user,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};

const addFavorite = async (req, res) => {
  try {
    const {
      id,
    } = req.params;

    if (id === req.user.userId) {
      return res.status(400).json({
        message: 'Ви не можете добавити самого себе.',
      });
    }

    const currUser = await models.User.findOne({
      _id: req.user.userId,
    }).exec();

    if (!currUser) {
      return res.status(404).json({
        message: 'Користувач не знайдений.',
      });
    }

    const userFav = currUser.favorites.filter((item) => String(item) === String(req.user.userId));

    if (userFav.length < 1) {
      currUser.favorites.push(id);
      currUser.save();
    }
    return res.status(200).json({
      message: 'Користувач був доданий до вибраного.',
    });

  } catch (e) {
    return res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз.',
    });
  }
};

const DeleteFromFavorite = async (req, res) => {
  const {
    id,
  } = req.params;


  const currUser = await models.User.findOne({
    _id: req.user.userId,
  }).exec();

  if (!currUser) {
    return res.status(404).json({
      message: 'Користувач не знайдений.',
    });
  };

  const index = currUser.favorites.indexOf(id);

  if (index < 0) {
    return res.status(404).json({
      message: 'Користувач не у вибраних, ви не можете його видалити.',
    });
  }

  currUser.favorites.splice(
    index,
    1
  );
  currUser.save();

  return res.status(200).json({
    message: 'Користувач був видалений із вибраного.',
  });
}
module.exports = {
  currentUser,
  addFavorite,
  DeleteFromFavorite,
};
