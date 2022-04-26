module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
      required: true,
      select: false,
    },
    profilePicUrl: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });
  {
    timeStamps: true;
  }

  User.associate = (models) => {
    User.hasMany(models.profile);
  };
  return User;
};
