const models = require('../models/index');

const searchUsers = async (req, res) => {
  const searchText = `${req.params.v}`;
  const searchRegex = new RegExp(searchText, 'i');

  await models.User.find({
    $or: [{
        firstName: searchRegex
      },
      {
        lastName: searchRegex
      },
      {
        email: searchRegex
      },
      {
        phone: searchRegex
      }
    ]
  }).then((users) => {
    if (users == null) res.status(404).json({
      success: false,
      message: 'No user found'
    })
    res.status(200).json({
      message: 'Users received',
      users,
    });
  }).catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Encountered an error finding user',
      error: err
    })
  })
};

module.exports = {
  searchUsers,
};
