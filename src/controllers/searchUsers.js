const models = require('../models/index');

const searchUsers = async (req, res) => {
  // Пошук користувачів
  // /api/user/search/:searchValue
  try {
    const searchText = `${req.params.searchValue}`; // or some value from request.body
    const searchRegex = new RegExp(searchText, 'i');
    const candidate = await models.User.find({
      userName: searchRegex,
    }).limit(5);
    res.status(200).json({
      message: 'Користувачі були знайдені.',
      candidate,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Щось пішло не так, попробуйте ще раз1.',
    });
  }
};

module.exports = {
  searchUsers,
};
