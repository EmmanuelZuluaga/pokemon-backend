const { response } = require('express');
const User = require('../models/user_model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: '¡Correo electrónico no registrado!',
      });
    }
    //Si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: '¡El usuario no se encuentra activo!',
      });
    }
    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: '¡Contraseña incorrecta!',
      });
    }
    //generar JWT
    const token = await generateJWT(user.id);
    return res.json({
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
