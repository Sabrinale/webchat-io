const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {type: String, unique: true, default: ''},
    fullname: {type: String, unique: true, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'defaultPic.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default: ''},
    googleTokens: Array,
});
module.exports = mongoose.model('User', userSchema);