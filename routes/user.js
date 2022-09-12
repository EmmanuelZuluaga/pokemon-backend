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
    postUser
  );

  router.get('/:id', getUserById);

  router.delete(
    '/:id',
    deleteUser
  );

module.exports = router;