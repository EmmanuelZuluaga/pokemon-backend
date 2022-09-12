const { response } = require('express');
const User = require('../models/user_model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const getUserById = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json({
      user,
    });
  };

  const getAllUser = async (req, res = response) => {
    const users = await User.find();
    return res.json({
      users,
    });
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id)
    return res.json({
      msg: 'User deleted'
    });
  };

  const postUser = async (req, res = response) => {
    const { name, nickname, password, team} = req.body;

    const verifyUser= await User.find({nickname:nickname})

    if(!verifyUser[0]){
      const user = new User({
        nickname,
        name,
        team,
        password
      });
      const salt = bcryptjs.genSaltSync(10);
      user.password = bcryptjs.hashSync(password, salt);
      const token = await generateJWT(user.id);
       await user.save();
      return res.json({
        success:true,
        user,
        token,
      });
    }else{
      return res.json({
       success:false
      });
    }
    

   
  };
  

  module.exports = {
    getAllUser,
    postUser,
    deleteUser,
    getUserById,
  };