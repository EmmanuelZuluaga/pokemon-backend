const express = require('express');

const {
    getAllUser,
    postUser,
    deleteUser,
    getUserById,
  } = require('../controllers/user_controller');
  
  const router = express();
router.disable('x-powered-by');

router.get('/allUsers', getAllUser);

//Create user
router.post(
    '/',
    [
      check('nickname', 'Nickname is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('password', 'Password is required').not().isEmpty(),
      check('team', 'Team is required').not().isEmpty()
    ],
    postUser
  );

  router.get('/:id', getUserById);

  router.delete(
    '/:id',
    [
      check('id', 'id requested is not valid').isMongoId(),
      check('id').custom(existUserById),
      validateFields,
    ],
    deleteUser
  );

module.exports = router;