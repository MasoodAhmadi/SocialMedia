const mongoose = require('mongoose');
const pw_db = process.env.MONGO_DB_PW;
const db = `mongodb+srv://masood:${pw_db}@cluster0.auyob.mongodb.net/nestjs`;
function connectDB() {
  try {
    mongoose.connect(`${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Databases is connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;
