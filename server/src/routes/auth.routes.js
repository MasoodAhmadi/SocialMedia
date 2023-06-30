const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.modal');
// const FollowerSchema = require('../models/followerModel');
const { user_schema: schema } = require('../validation');
const { auth, asyncErrorHandler } = require('../middlewares');

router.get('/', auth, async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    // const userFollowStats = await FollowerSchema.findOne({ user: userId });
    return res
      .status(200)
      .send({ email: user.email, id: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send('Invalid Credentials');
    }
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).send(token);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
