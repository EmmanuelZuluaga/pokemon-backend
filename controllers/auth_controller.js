const { response } = require('express');
const User = require('../models/user_model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res = response) => {
  const { nickname, password } = req.body;
  try {
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(400).json({
        success:false,
        msg: 'Nickname not registered',
      });
    }

    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success:false,
        msg: 'Incorrect password',
      });
    }
    //generar JWT
    const token = await generateJWT(user.id);
    return res.json({
      success:true,
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Server Error',
    });
  }
};

const validateUserToken = async (req, res = response) => {
  // Generar el JWT
  const token = await generateJWT(req.user._id);

  res.json({
    user: req.user,
    token: token,
  });
};




module.exports = {
  login,
  validateUserToken
};
