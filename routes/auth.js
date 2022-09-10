const express = require('express');
const { check } = require('express-validator');
const { login, validateUserToken, recoverPassword, changePassword, loginGoogle } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express();
router.disable('x-powered-by');

//Login
router.post(
  '/login',
  [
    check('email', 'Error in email Field').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

router.get('/', [validateJWT], validateUserToken);

router.put('/changePassword/:id', changePassword);

// Route recover password
router.post(
  '/recoverPassword',
  [
    check('email', 'Formato incorrecto de email').isEmail(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    validateFields,
  ],
  recoverPassword
);

module.exports = router;
