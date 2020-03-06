const User = require('../db/schemat/userSchema');
const bcrypt = require('bcryptjs');

const getUsers = () => {
  //return all registered users
  return User.find();
};

const getUserByUsername = username => {
  return User.find({ username });
};

const getActiveUsers = () => {
  //return all users from db where active status = true
};

const addUser = async user => {
  const { username, password, email } = user;
  // Creating new user with the Mongoose schema
  user = new User({
    username,
    password,
    email
  });
  try {
    //Generating salt with recommended strength
    const salt = await bcrypt.genSalt(10);

    //Hash password - generate hash and replace the password with the hashed password in user object

    user.password = await bcrypt.hash(password, salt);
    //Save the user to DB:
    await user.save();
    console.log(user.getJwtToken());
  } catch (err) {
    console.error(err.message);
  }
};

const disconnectUser = user => {
  //set user active status to false, return disconnect msg
};

// const deleteUser = (user) => {
//     //logic
// }

module.exports = { getUsers, addUser, getUserByUsername };
