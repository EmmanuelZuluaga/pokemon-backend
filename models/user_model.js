const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  deviceToken: {
    type: String,
    required: false,
    default: '',
  },
  nickname: {
    type: String,
    require: [true, 'The name is required'],
  },
  name: {
    type: String,
  },
  team: {
    type: String,
    require: [true, 'The team is required'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'The password is required'],
  },
 
  lastConexion: {
    type: Date,
    require: false
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);
