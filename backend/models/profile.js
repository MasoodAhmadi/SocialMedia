module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("profile", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bio: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    social: [
      {
        youtube: { type: DataTypes.STRING },
        instagram: { type: DataTypes.STRING },
        twitter: { type: DataTypes.STRING },
        facebook: { type: DataTypes.STRING },
      },
    ],
  });
  Profile.associate = (models) => {
    Profile.hasMany(models.follower);
  };
  return Profile;
};
