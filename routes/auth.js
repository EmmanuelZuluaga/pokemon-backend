const express = require('express');
const { check } = require('express-validator');
const { login, validateUserToken } = require('../controllers/auth_controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express();
router.disable('x-powered-by');

//Login
router.post(
  '/login',
  [
    check('email', 'Error in email Field').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ],
  login
);

router.get('/', [validateJWT], validateUserToken);


module.exports = router;
