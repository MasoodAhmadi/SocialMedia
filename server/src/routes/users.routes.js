require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const isEmail = require('validator/lib/isEmail');
const jwt = require('jsonwebtoken');
const profileModel = require('../models/profileModel');
const followerModel = require('../models/followerModel');
const { auth } = require('../middleware/auth.middleware');

const userPng =
  'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

//Getting all data
router.get('/', auth, async (req, res) => {
  const users = await UserModel.findAll({
    attributes: ['id', 'email', 'username'],
  });
  res.status(200).json(users);
});

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    if (username.length < 1) return res.status(401).send('Invalid');
    if (!regexUserName.test(username)) return res.status(401).send('Invalid');
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (user) return res.status(401).send('Username already taken');
    return res.status(200).send('Available');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body;

  if (!isEmail(email)) return res.status(401).send('Invalid Email');
  if (password?.length < 6) {
    return res.status(401).send('Password must be atleast 6 characters');
  }
  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(401).send('User already registered');
    }

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username?.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileFields = {};
    profileFields.user = user._id;

    profileFields.bio = bio;

    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    await new profileModel(profileFields).save();
    await new followerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10hr' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// router.put('/updateuser/:id', async (req, res, next) => {
//   console.log('req.body', req.body);

//   try {
//     await User.update(req.body, {
//       where: { id: req.params.id },
//     });
//     const user = await user.findOne({ where: { id: req.params.id } });

//     res.status(200).json(user);
//   } catch (error) {
//     console.log('error: ', error);
//   }
// });

// router.post('/signup', async (req, res, next) => {
//   try {
//     const { username, name, email, password, bio } = req.body;
//     if (!isEmail(email)) return res.status(401).send('invalid email');
//     if (password.length < 6)
//       return res.status(400).send('password must be 8 charactor');
//     const userFound = await User.findAll({
//       where: { email },
//     });
//     if (userFound[0]) {
//       return res.status(401).send('email already exists');
//     }
//     let product = {
//       username,
//       name,
//       email,
//       password,
//       bio,
//     };
//     product.password = await bcrypt.hash(password, 10);
//     if (req.files !== null) {
//       const file = req.files.photo;
//       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//         if (!err) {
//           const myUser = new User({
//             username: product.username,
//             name: product.name,
//             created_at: new Date(),
//             email: product.email,
//             password: product.password,
//             bio: product.bio,
//             profilePicUrl: result.url,
//           });
//           myUser.save(function (err, res) {
//             if (err) {
//               res.send(err);
//             }
//             return res.status(200).json(myUser);
//           });
//         }
//       });
//     } else {
//       await User.create(product);
//       return res.status(200).json(product);
//     }
//   } catch ({ message }) {
//     console.log(message);
//     res.status(500).send({ message });
//   }
// });

module.exports = router;
// router.post('/signin', async (req, res) => {
//   const { email } = req.body;
//   const { value, error } = auth_schema.validate(req.body);
//   if (error) return res.status(400).send({ message: error.details[0].message });
//   const userFound = await user.findAll({
//     where: { email },
//   });
//   // const passwordIsValid = bcrypt.compareSync(password, user.password);

//   // if (!passwordIsValid) {
//   //   return res.status(401).send({
//   //     accessToken: null,
//   //     message: "Invalid Password!",
//   //   });
//   // }
//   // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//   //   expiresIn: 86400, // 24 hours
//   // });
//   if (!userFound[0])
//     return res.status(400).send({ error: 'Invalid email or password' });
//   const validPassword = await bcrypt.compare(
//     value.password,
//     userFound[0].password
//   );
//   if (!validPassword)
//     return res.status(400).send({ error: 'Invalid email or password' });
//   const token = user.generateAuthToken(userFound[0].id);
//   res.status(200).send({ token });

//   // return res.status(200).send({
//   //   // id: user.id,
//   //   // username: user.username,
//   //   email: email,
//   //   password: password,
//   //   // accessToken: token,
//   // });
// });

// router.post("/signin", async (req, res) => {
//   const { email } = req.body;
//   const userFound = await User.findAll({
//     where: { email },
//   });
//   if (!userFound[0])
//     return res.status(400).send({ error: "Invalid email or password" });
//   const validedPassword = await bcrypt.compare(userFound[0].password);
//   if (!validedPassword)
//     return res.status(400).send({ error: "Invalid email or password" });
//   const token = User.generateAuthToken(userFound[0].id);
//   res.status(200).send({ token });
// });

//image posting
// router.post("/addprofile", async (req, res, next) => {
//   console.log("/addprofile");
//   try {
//     const { username, name, email, password, bio } = req.body;
//     if (!isEmail(email)) return res.status(401).send("invalid email");
//     if (password.length < 6)
//       return res.status(400).send("password must be 8 charactor");
//     const userFound = await User.findAll({
//       where: { email },
//     });
//     if (userFound[0]) {
//       console.log("i am here");
//       console.log(userFound[0]);
//       return res.status(401).send("user exists");
//     }
//     let product = {
//       username,
//       name,
//       email,
//       password,
//       bio,
//     };
//     product.password = await bcrypt.hash(password, 10);
//     if (req.files !== null) {
//       const file = req.files.photo;
//       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//         product.profilePicUrl = result.url;
//         console.log(result);
//         await User.create(product);
//         return res.status(200).json(product);
//       });
//     } else {
//       await User.create(product);
//       return res.status(200).json(product);
//     }
//   } catch ({ message }) {
//     console.log("/addprofile failed " + message);
//     res.status(500).send({ message });
//   }
// });

//image posting jannaten method
/* router.post("/upload_jannaten", async (req, res, next) => {
  try {
    const { username, firstname, email, password, bio } = req.body;
    if (!isEmail(email)) return res.status(400).send("invalid email");
    if (password.length < 6)
      return res.status(400).send("password must be 8 charactor");
    let product = {
      username,
      firstname,
      email,
      password,
      bio,
    };
    product.password = await bcrypt.hash(password, 10);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      product.profilePicUrl = result.url;
      await User.create(product);
      return res.status(200).json(product);
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
}); */
