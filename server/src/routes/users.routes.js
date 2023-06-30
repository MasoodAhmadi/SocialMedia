const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.modal');
const { user_schema: schema } = require('../validation');
const { auth, asyncErrorHandler } = require('../middlewares');

// router.get('/create_demo', async (req, res, next) => {
//   try {
//     const hashedPassword = await bcrypt.hash('asdf123', 12);
//     const user = await User.create({
//       email: 'masood@eduix.it',
//       password: hashedPassword,
//       username: 'masoodahmadllli',
//       name: 'masood',
//       bio: 'sw',
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     next({
//       clientStatusCode: 500,
//       trace: error?.errors || error?.response?.data,
//       statusCode: error.status || error?.response?.status || error.statusCode,
//       message: error?.response?.message || error.message,
//     });
//   }
// });

//Getting all data
router.get(
  '/',
  auth,
  asyncErrorHandler(async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email'] });
    res.status(200).json(users);
  })
);
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

// Editing data
router.post(
  '/',
  asyncErrorHandler(async (req, res) => {
    const { value, error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const emailAlreadyExists = await User.findOne({
      where: { email: value.email },
      paranoid: false,
    });

    if (emailAlreadyExists) {
      return res.status(400).json({ message: 'email aready taken' });
    }
    const hashedPassword = await bcrypt.hash(value.password, 12);
    const user = await User.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).json(user);
  })
);

// Editing data
router.put(
  '/:id',
  auth,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { value, error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const queryExist = await User.findAll({ where: { id } });
    let hashedPassword = queryExist[0].password;
    if (!queryExist[0])
      return res.status(404).send({ message: `user of id ${id} not found` });
    if (value?.password !== 'default_password')
      hashedPassword = await bcrypt.hash(value.password, 12);
    await User.update(
      { email: value.email, password: hashedPassword },
      { where: { id } }
    );
    const query = await User.findAll({ where: { id } });
    res.status(200).send(query[0]);
  })
);
// Deleting data
router.delete(
  '/:id',
  auth,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const query = await User.findAll({
      where: { id },
    });
    if (!query[0])
      return res.status(404).send({ message: `user of id ${id} not found` });
    await User.destroy({ where: { id } });
    return res.status(200).send(query[0]);
  })
);

module.exports = router;
