const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const { User } = require('../sequelize');
// const cloudinary = require('cloudinary').v2;
// const follower = require('../models/follower');
// const isEmail = require('validator/lib/isEmail');
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const { verifyToken } = require('../middleware/auth.middleware');
const { auth, asyncErrorHandler } = require('../middleware');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
//   secure: true,
// });

router.get('/create_demo', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash('123456789', 12);
    const user = await User.create({
      name: 'masood',
      username: 'masoodahmadi',
      email: 'masood@example.com',
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next({
      clientStatusCode: 500,
      trace: error?.errors || error?.response?.data,
      statusCode: error.status || error?.response?.status || error.statusCode,
      message: error?.response?.message || error.message,
    });
  }
});

//Getting all data
router.get('/', auth, asyncErrorHandler, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'name', 'username'],
  });
  res.status(200).json(users);
});

// Getting data by id
router.get(
  '/:id',
  auth,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const query = await User.findAll({ where: { id } });
    if (!query[0])
      return res.status(404).send({ message: `user of id ${id} not found` });
    res.status(200).send(query[0]);
  })
);

// router.get('/token', verifyToken, async (req, res) => {
//   const findUser = await User.findAll({
//     where: { id: req.user.id },
//     attributes: { exclude: ['password'] },
//     // include: [{ model: avatar }],
//   });
//   res.send(findUser[0]);
// });

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({});
//     res.status(200).json(users);
//   } catch (error) {
//     console.log('error happened!', error);
//   }
// });

// router.get("/login", async (req, res, next) => {
//   try {
//     res.send({
//       token: "test123",
//     });
//   } catch (error) {
//     console.log("error happened!", error);
//   }
// });

// router.get('/:username', async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     if (username.length < 0) return res.status(401).send('invalid');
//     if (!resgexUserName.test(username)) return res.status(400).send('invalid');
//     const users = await User.findOne({
//       where: { username: username.toLowerCase() },
//     });
//     console.log('user', users);

//     if (users) {
//       return res.status(401).send('Username already taken');
//     } else {
//       return res.status(200).send('Available');
//     }
//   } catch ({ message }) {
//     res.status(500).send({ message });
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const user = await user.findOne({ where: { id: req.params.id } });

//     // console.log("im here");

//     res.status(200).json(user);
//   } catch ({ message }) {
//     err.status(500).send(message);
//   }
// });

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