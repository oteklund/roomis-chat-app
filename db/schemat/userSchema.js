const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }

});

//Luokalle metodi, joka generoi tokenin secretin ja payloadin perusteella
// Auth POST (login) käyttää tätä hyväksi!
// .env-tiedostoon => JWT_SECRET & JWT_EXPIRE

userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
