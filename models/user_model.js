const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nickname: {
    type: String,
    require: [true, 'The name is required'],
    unique: false,
  },
  name: {
    type: String,
  },
  team: {
    type: String,
    require: [true, 'The team is required'],
    
  },
  password: {
    type: String,
    require: [true, 'The password is required'],
  },
 
  lastConexion: {
    type: Date,
    require: false,
    default: Date.now
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);
