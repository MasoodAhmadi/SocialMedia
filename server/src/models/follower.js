const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ],

  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ]
});

module.exports = mongoose.model("Follower", FollowerSchema);



// module.exports = (sequelize, DataTypes) => {
//   const Follower = sequelize.define("follower", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     followers: [
//       {
//         username: { type: DataTypes.STRING },
//       },
//     ],
//     following: [
//       {
//         username: { type: DataTypes.STRING },
//       },
//     ],
//   });

//   return Follower;
// };
