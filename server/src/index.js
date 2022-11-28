const express = require('express');
const path = require('path');
const helmet = require('helmet');
const userRoute = require('./routes/users.routes');
const authRoute = require('./routes/auth.routes');
const CONTAINER_PORT = process.env.SERVER_CONTAINER_PORT;
const PUBLIC_PORT = process.env.SERVER_PUBLIC_PORT;

const app = express();

//middlewares
app.use(helmet());
app.use(express.static('build'));
app.use(express.json());

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

// post middlewares
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
// app.use(errorLogger);
// app.use(errorHandler);

app.listen(CONTAINER_PORT, () => {
  console.log(`Server running on localhost:${PUBLIC_PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const userRouter = require('./routes/users.routes');
// const authRouter = require('./routes/auth.routes');
// // const localizationRouter = require('./routes/localization.routes');
// // require('dotenv').config();
// const cors = require('cors');
// const app = express();

// const CONTAINER_PORT = process.env.SERVER_CONTAINER_PORT;
// const PUBLIC_PORT = process.env.SERVER_PUBLIC_PORT;
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// app.use(express.urlencoded({ extended: true }));

// app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/username', userRouter); //check user name exist or not
// app.use('/api/finduser', userRouter);
// // app.use('/localization', localizationRouter);
// app.get('/', (req, res) => {
//   res.send('chat application api!');
// });

// app.listen(CONTAINER_PORT, () => {
//   console.log(`Server running on localhost:${PUBLIC_PORT}`);
// });
