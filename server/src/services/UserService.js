const UserModel = require('../models/user.modal');
const { connectDB } = require('../utilsServer/connectDb');

class UserService {
  getModel = async function () {
    const context = await connectDB();
    return UserModel(context);
  };

  getAll = async function (query = {}) {
    const User = await this.getModel();
    return await User.find(query);
  };

  getById = async function (userId, query = {}) {
    const User = await this.getModel();
    return await User.findById(userId, query);
  };

  getByEmail = async function (userEmail) {
    const User = await this.getModel();
    return await User.findOne({
      email: userEmail,
    });
  };

  create = async function (data) {
    const User = await this.getModel();
    const user = new User(data);
    return await user.save();
  };

  update = async function (id, data) {
    const User = await this.getModel();
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
    });
  };

  delete = async function (id) {
    const User = await this.getModel();
    return await User.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );
  };

  destroy = async function (id) {
    const User = await this.getModel();
    return await User.findByIdAndDelete(id);
  };
}

module.exports = UserService;
