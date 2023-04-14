const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name cannot be blank!']
  },
  email: {
    type: String,
    unique: true,
    // required: [true, 'Email cannot be blank!']
  },
  password: {
    type: String,
    // required: [true, 'Password cannot be blank!']
  },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel