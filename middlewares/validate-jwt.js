const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      msg: 'Token required in request',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: 'User does NOT exist',
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token is not valid - user with status false',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token sent is not valid',
    });
  }
};

module.exports = {
  validateJWT,
};
