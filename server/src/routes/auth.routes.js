const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.modal');
const FollowerSchema = require('../models/followerModel');
const { user_schema: schema } = require('../validation');
const { auth, asyncErrorHandler } = require('../middlewares');

router.get('/', auth, async (req, res) => {
  const { userId } = req;
  // console.log(userId);
  try {
    const user = await User.findById(userId);
    // const userFollowStats = await FollowerSchema.findOne({ user: userId });

    return res.status(200).send({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }

  // return res.status(200).send(user);
});

router.post('/', async (req, res) => {
  // console.log(req.body);
  // const { value, error } = schema.validate(req.body);
  const { email, password } = req.body;

  // if (error)
  //   return res.status(400).send({ message: error.details[0].message });
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
