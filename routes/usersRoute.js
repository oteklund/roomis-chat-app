const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser } = require('../services/userService');
const User = require('../db/schemat/userSchema');

router.route('/').post(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ msg: 'Required field is missing!' });
  }

  try {
    //Check if user exists - Siirretään serviceen kun tehty siellä!
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    let token = await addUser({ username, password, email });

    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

module.exports = router;
