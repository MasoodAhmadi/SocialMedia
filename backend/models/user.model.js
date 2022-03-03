module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING(60),
      },
      firstname: {
        type: DataTypes.STRING(60),
      },
      email: {
        type: DataTypes.STRING(120),
      },
      password: {
        type: DataTypes.STRING(60),
      },
      bio: {
        type: DataTypes.STRING(220),
      },
    },
    {}
  );
  return Users;
};
