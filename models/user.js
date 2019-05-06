const mongoose     = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  uberId: String
});

UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);

module.exports = User;