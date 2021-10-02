const models = require('../models/index');

const disconnect = async (req, res) => {
  const {
    id,
  } = req.body;
  await models.UserToken.findOneAndRemove({
    user: id,
  }).exec();

  res.status(200).json({
    message: 'Logout success.',
  });
};

module.exports = {
  disconnect,
};
