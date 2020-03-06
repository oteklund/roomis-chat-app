const { Router } = require('express');
const router = Router();
const User = require('../db/schemat/userSchema');
const { getUserByUsername } = require('../services/userService');
const passport = require('passport');

router
  .route('/login')
  .post(passport.authenticate('local'), async (req, res) => {
    console.log(req.user);

    const token = req.user.getJwtToken();
    res.status(200).json({ success: true, token });
  });

router.get(
  '/authenticate',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ username: req.user.username });
  }
);

module.exports = router;
