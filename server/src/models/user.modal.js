module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(250),
        required: true,
        select: false,
        allowNull: false,
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
    },
    { onDelete: 'cascade', onUpdate: 'cascade' }
  );

	/*
 * | users | CREATE TABLE `users` (
 *  `id` int(11) NOT NULL AUTO_INCREMENT,
 *  `email` varchar(255) NOT NULL,
 *  `password` varchar(128) NOT NULL,
 *  `createdAt` datetime NOT NULL,
 *  `updatedAt` datetime NOT NULL,
 *  PRIMARY KEY (`id`),
 *  UNIQUE KEY `email` (`email`),
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci |
 */
  // User.generateAuthToken = (id, role) => {
  //   // const token = jwt.sign({ id, role }, config.get("jwtPrivateKey"));
  //   const token = jwt.sign({ id, role }, process.env.JWT_PRIVATE_KEY, {
  //     expiresIn: process.env.JWT_TOKEN_EXPIRE,
  //   });
  // return token;
  // };

  // User.associate = (models) => {
  //   User.hasMany(models.profile);
  // };
  return User;
};
