module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: {
        type: DataTypes.STRING(60),
      },
      lastName: {
        type: DataTypes.STRING(60),
      },
      email: {
        type: DataTypes.STRING(120),
      },
    },
    {}
  );
  return Users;
};
