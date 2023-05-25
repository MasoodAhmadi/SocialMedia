const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    bio: { type: String, required: true },

    social: {
      facebook: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      instagram: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);







// module.exports = (sequelize, DataTypes) => {
//   const Profile = sequelize.define("profile", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     bio: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     social: [
//       {
//         youtube: { type: DataTypes.STRING },
//         instagram: { type: DataTypes.STRING },
//         twitter: { type: DataTypes.STRING },
//         facebook: { type: DataTypes.STRING },
//       },
//     ],
//   });
//   Profile.associate = (models) => {
//     Profile.hasMany(models.follower);
//   };
//   return Profile;
// };
