module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
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

      profilePicUrl: {
        type: DataTypes.STRING,
      },
      newMessagePopup: {
        type: DataTypes.Boolean,
        default: true,
      },
      unreadMessage: {
        type: DataTypes.Boolean,
        default: false,
      },
      unreadNotification: {
        type: DataTypes.Boolean,
        default: false,
      },
      role: {
        type: DataTypes.String,
        default: "user",
        enum: ["user", "root"],
      },
      resetToken: {
        type: DataTypes.STRING,
      },
      expireToken: {
        type: DataTypes.Date,
      },
    },
    { timestamps: true }
  );
  return Profile;
};
