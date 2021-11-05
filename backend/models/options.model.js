module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define("option", {
    label: {
      type: Sequelize.STRING,
    },
    selected: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Option;
};
