module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define("follower", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    followers: [
      {
        username: { type: DataTypes.STRING },
      },
    ],
    following: [
      {
        username: { type: DataTypes.STRING },
      },
    ],
  });

  return Follower;
};
