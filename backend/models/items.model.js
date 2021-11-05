module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    options: {
      type: Sequelize.STRING,
    },
    discount: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Item;
};
